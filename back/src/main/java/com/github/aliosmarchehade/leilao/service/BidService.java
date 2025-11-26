package com.github.aliosmarchehade.leilao.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import com.github.aliosmarchehade.leilao.model.Bid;
import com.github.aliosmarchehade.leilao.bid.BidMapper;
import com.github.aliosmarchehade.leilao.bid.BidRequestDTO;
import com.github.aliosmarchehade.leilao.bid.BidResponseDTO;
import com.github.aliosmarchehade.leilao.model.Leilao;
import com.github.aliosmarchehade.leilao.model.Pessoa;
import com.github.aliosmarchehade.leilao.repository.BidRepository;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    @Autowired
    private LeilaoService leilaoService;

    @Autowired
    private AutenticacaoService autenticacaoService;

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private LogService logService;

    public BidResponseDTO criarLance(BidRequestDTO dto) {

        // 🔐 Usuário logado
        Pessoa pessoa = autenticacaoService.getUsuarioLogado();

        // 🎯 Buscar leilão
        Leilao leilao = leilaoService.buscarPorId(dto.getAuctionId());

        // 🕒 Validar período
        LocalDateTime agora = LocalDateTime.now();
        if (agora.isBefore(leilao.getStartDateTime()) || agora.isAfter(leilao.getEndDateTime())) {
            throw new RuntimeException("Leilão não está ativo no momento.");
        }

        // 💰 Validar incremento mínimo
        BigDecimal maiorLance = bidRepository.findByLeilaoIdOrderByValueBidDesc(leilao.getId())
                .stream()
                .findFirst()
                .map(Bid::getValueBid)
                .orElse(BigDecimal.ZERO);

        BigDecimal minimo = maiorLance.add(leilao.getIncrementValue());

        if (dto.getValueBid().compareTo(minimo) < 0) {
            throw new RuntimeException("O lance mínimo é: " + minimo);
        }

        // 📝 Criar lance
        Bid bid = new Bid();
        bid.setLeilao(leilao);
        bid.setPessoa(pessoa); // 🔥 garante que o JSON terá nome/email
        bid.setValueBid(dto.getValueBid());
        bid.setDateTime(LocalDateTime.now());

        bidRepository.save(bid);

        // Converter para DTO
        BidResponseDTO response = BidMapper.toDTO(bid);

        // 🔥 Enviar via WebSocket (tempo real)
        messagingTemplate.convertAndSend(
            "/topic/auction/" + leilao.getId(),
            response
        );
        
        System.out.println("🔥 Enviando WS para /topic/auction/" + leilao.getId());
        System.out.println(response);

        logService.registrarAcao(
            pessoa.getId(),
            "Usuário " + pessoa.getNome() +
            " deu um lance de R$ " + bid.getValueBid() +
            " no leilão " + leilao.getTitle()
        );

        return response;

        
    }

    

    public List<BidResponseDTO> listarPorLeilao(Long leilaoId) {
        List<Bid> bids = bidRepository.findByLeilaoIdOrderByValueBidDesc(leilaoId);

        return bids.stream()
                .map(BidMapper::toDTO)
                .toList();
    }
}

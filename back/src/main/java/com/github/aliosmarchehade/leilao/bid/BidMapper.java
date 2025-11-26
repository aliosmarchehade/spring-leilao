package com.github.aliosmarchehade.leilao.bid;

import com.github.aliosmarchehade.leilao.model.Bid;
import com.github.aliosmarchehade.leilao.model.Pessoa;
import com.github.aliosmarchehade.leilao.model.Leilao;
import com.github.aliosmarchehade.leilao.dto.PessoaSummaryDTO;

public class BidMapper {

    public static BidResponseDTO toDTO(Bid bid) {

        BidResponseDTO dto = new BidResponseDTO();

        dto.setId(bid.getId());
        dto.setValueBid(bid.getValueBid());
        dto.setDateTime(bid.getDateTime());

        Pessoa p = bid.getPessoa();

        dto.setUserId(p.getId());
        dto.setUserNome(p.getNome());
        dto.setUserEmail(p.getEmail());

        return dto;
    }
}


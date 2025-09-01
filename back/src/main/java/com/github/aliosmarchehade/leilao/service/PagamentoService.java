package com.github.aliosmarchehade.leilao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.github.aliosmarchehade.leilao.exception.NaoEncontradoExcecao;

import com.github.aliosmarchehade.leilao.model.Pagamento;
import com.github.aliosmarchehade.leilao.repository.PagamentoRepository;



@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @Autowired
    private MessageSource messageSource;

    public Pagamento inserir(Pagamento pagamento) {
        Pagamento pagamentoCadastrado = pagamentoRepository.save(pagamento);
        return pagamentoCadastrado;
    }


    public Pagamento alterar(Pagamento pagamento) {
        Pagamento pagamentoBanco = buscarPorId(pagamento.getId());
        pagamentoBanco.setValor(pagamento.getValor());
        pagamentoBanco.setStatus(pagamento.getStatus());

        return pagamentoRepository.save(pagamentoBanco);
    }

    public void deletar(long id) {
        Pagamento pagamentBanco = buscarPorId(id);
        pagamentoRepository.delete(pagamentBanco);
    }

    public Pagamento buscarPorId(Long id) {
        return pagamentoRepository.findById(id)
            .orElseThrow(() -> new NaoEncontradoExcecao(
                messageSource.getMessage("pagamento.notfound",
                new Object[]{id},
                LocaleContextHolder.getLocale())
            ));
    }

    public Page<Pagamento> buscarTodos(Pageable pageable) {
        return pagamentoRepository.findAll(pageable);
    }
}

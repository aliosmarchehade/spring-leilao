package com.github.aliosmarchehade.leilao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.github.aliosmarchehade.leilao.exception.NaoEncontradoExcecao;
import com.github.aliosmarchehade.leilao.model.Feedback;
import com.github.aliosmarchehade.leilao.repository.FeedbackRepository;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private MessageSource messageSource;

    public Feedback inserir(Feedback feedback) {
        Feedback feedbackCadastrado = feedbackRepository.save(feedback);
        return feedbackCadastrado;
    }
    public Feedback alterar(Feedback feedback) {
        Feedback feedbackBanco = buscarPorId(feedback.getId());
        feedback.setComentario(feedback.getComentario());
        feedback.setNota(feedback.getNota());
        return feedbackRepository.save(feedbackBanco);
    }

    public void deletar(long id) {
        Feedback feedbackBanco = buscarPorId(id);
        feedbackRepository.delete(feedbackBanco);
    }

    public Feedback buscarPorId(Long id) {
        return feedbackRepository.findById(id)
            .orElseThrow(() -> new NaoEncontradoExcecao(
                messageSource.getMessage("feedback.notfound",
                new Object[]{id},
                LocaleContextHolder.getLocale())
            ));
    }

    public Page<Feedback> buscarTodos(Pageable pageable) {
        return feedbackRepository.findAll(pageable);
    }
}

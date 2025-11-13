package com.github.aliosmarchehade.leilao.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.aliosmarchehade.leilao.model.LogEvento;
import com.github.aliosmarchehade.leilao.repository.LogRepository;

@Service
public class LogService {

    @Autowired
    private LogRepository logRepository;

    public List<LogEvento> buscarTodos() {
        return logRepository.findAll();
    }

    public List<LogEvento> buscarPorUsuario(Long usuarioId) {
        return logRepository.findByUsuarioId(usuarioId);
    }

    public LogEvento inserir(LogEvento log) {
        log.setDataHora(LocalDateTime.now());
        return logRepository.save(log);
    }

    // Método utilitário para registrar log de forma rápida
    public void registrarAcao(Long usuarioId, String acao) {
        LogEvento log = LogEvento.builder()
                .usuarioId(usuarioId)
                .acao(acao)
                .dataHora(LocalDateTime.now())
                .build();
        logRepository.save(log);
        System.out.println(">>> LOG SALVO: Usuário " + usuarioId + " - " + acao);
    }
}

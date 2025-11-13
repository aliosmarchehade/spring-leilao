package com.github.aliosmarchehade.leilao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.github.aliosmarchehade.leilao.dto.PessoaAutenticacaoDTO;
import com.github.aliosmarchehade.leilao.dto.PessoaRequisicaoDTO;
import com.github.aliosmarchehade.leilao.service.AutenticacaoService;
import com.github.aliosmarchehade.leilao.service.LogService;

@RestController
@RequestMapping("/autenticacao")
public class AutenticacaoController {

    @Autowired
    private AutenticacaoService autenticacaoService;

    @Autowired
    private LogService logService; // 👈 injeção do LogService

    @PostMapping("/login")
    public ResponseEntity<PessoaAutenticacaoDTO> login(@RequestBody PessoaRequisicaoDTO pessoa) {
        PessoaAutenticacaoDTO autenticado = autenticacaoService.autenticar(pessoa);

        // ⚙️ Verifica se o login foi bem-sucedido antes de registrar
        if (autenticado != null && autenticado.getId() != null) {
            logService.registrarAcao(
                autenticado.getId(),
                "Usuário " + autenticado.getNome() + " fez login no sistema"
            );
        }

        return ResponseEntity.ok(autenticado);
    }
}

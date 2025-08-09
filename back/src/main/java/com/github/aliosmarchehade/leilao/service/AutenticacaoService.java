package com.github.aliosmarchehade.leilao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;


import com.github.aliosmarchehade.leilao.dto.PessoaRequisicaoDTO;
import com.github.aliosmarchehade.leilao.security.JwtService;

@Service
public class AutenticacaoService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    public String autenticar(PessoaRequisicaoDTO pessoa) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(pessoa.getEmail(), pessoa.getSenha())
        );

        return jwtService.generateToken(authentication.getName());
    }
}

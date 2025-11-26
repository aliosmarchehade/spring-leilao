package com.github.aliosmarchehade.leilao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.github.aliosmarchehade.leilao.dto.PessoaAutenticacaoDTO;
import com.github.aliosmarchehade.leilao.dto.PessoaRequisicaoDTO;
import com.github.aliosmarchehade.leilao.model.Pessoa;
import com.github.aliosmarchehade.leilao.repository.PessoaRepository;
import com.github.aliosmarchehade.leilao.security.JwtService;

@Service
public class AutenticacaoService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PessoaRepository pessoaRepository;

    public PessoaAutenticacaoDTO autenticar(PessoaRequisicaoDTO pessoa) {
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(pessoa.getEmail(), pessoa.getSenha())
        );
        
        Pessoa pessoaBanco = pessoaRepository.findByEmail(pessoa.getEmail())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        String tipoPerfil = pessoaBanco.getPessoaPerfil()
            .stream()
            .findFirst()
            .map(pp -> pp.getPerfil().getNome())
            .orElse("USER");

        PessoaAutenticacaoDTO autenticacaoDTO = new PessoaAutenticacaoDTO();
        autenticacaoDTO.setId(pessoaBanco.getId()); // 👈 adicionada
        autenticacaoDTO.setEmail(pessoaBanco.getEmail());
        autenticacaoDTO.setNome(pessoaBanco.getNome());
        autenticacaoDTO.setToken(jwtService.generateToken(authentication.getName()));
        autenticacaoDTO.setTipoPerfil(tipoPerfil);

        return autenticacaoDTO;
    }
    public Pessoa getUsuarioLogado() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication == null || !authentication.isAuthenticated()) {
        throw new RuntimeException("Usuário não está autenticado");
    }

    String email = authentication.getName();

    return pessoaRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
}
}

package com.github.aliosmarchehade.leilao.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.github.aliosmarchehade.leilao.model.Pessoa;
import com.github.aliosmarchehade.leilao.repository.PessoaRepository;

import java.util.NoSuchElementException;

@Component
public class AuthPessoaProvider {

    @Autowired
    private PessoaRepository userRepository;

   
    public Pessoa getUsuarioAutenticado() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;        

        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
            System.out.println(username);
        } else {
            username = principal.toString();
        }

        return userRepository.findByEmail(username)
                .orElseThrow(() -> new NoSuchElementException("Usuário autenticado não encontrado"));
    }
}
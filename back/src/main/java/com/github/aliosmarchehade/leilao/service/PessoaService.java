package com.github.aliosmarchehade.leilao.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;

import com.github.aliosmarchehade.leilao.exception.NaoEncontradoExcecao;
import com.github.aliosmarchehade.leilao.model.Pessoa;
import com.github.aliosmarchehade.leilao.repository.PessoaRepository;

@Service
public class PessoaService implements UserDetailsService{
    @Autowired
    private PessoaRepository pessoaRepository;


    @Autowired
    private MessageSource messageSource;

    @Autowired
    private EmailService emailService;

    public Pessoa inserir(Pessoa pessoa){
        Pessoa pessoaCadastrada = pessoaRepository.save(pessoa);
        //emailService.enviarEmailSimples(pessoaCadastrada.getEmail(), 
        //"Cadastrado com Sucesso", "Cadastro no Sistema de Leilão XXX foi feito com sucesso!");
        enviarEmailSucesso(pessoaCadastrada);
        return pessoaCadastrada;
    }

    private void enviarEmailSucesso(Pessoa pessoa){
        Context context = new Context();
        context.setVariable("nome", pessoa.getNome());
        emailService.emailTemplate
        (pessoa.getEmail(),"Cadastro Sucesso", context, "cadastroSucesso");

    }

    public Pessoa alterar(Pessoa pessoa){
        Pessoa pessoaBanco = buscarPorId(pessoa.getId());
        
        pessoa.setNome(pessoa.getNome());
        pessoa.setEmail(pessoa.getEmail());

        return pessoaRepository.save(pessoaBanco);
    }

    public void deletar(Long id){
        Pessoa pessoaBanco = buscarPorId(id);
        pessoaRepository.delete(pessoaBanco);
    }

    public Pessoa buscarPorId(Long id){
        return pessoaRepository.findById(id)
            .orElseThrow(()->new NaoEncontradoExcecao(messageSource.getMessage("pessoa.notfound",
                new Object[] {id},
                    LocaleContextHolder.getLocale())));
    }

    public Page<Pessoa> buscarTodos(Pageable pageable){
        return pessoaRepository.findAll(pageable);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'loadUserByUsername'");
    }
}


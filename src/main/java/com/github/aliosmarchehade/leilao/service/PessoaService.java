package com.github.aliosmarchehade.leilao.service;

import java.rmi.NoSuchObjectException;
import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContext;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Service;

import com.github.aliosmarchehade.leilao.exception.NaoEncontradoExcecao;
import com.github.aliosmarchehade.leilao.model.Pessoa;
import com.github.aliosmarchehade.leilao.repository.PessoaRepository;

@Service
public class PessoaService {
    @Autowired
    private PessoaRepository pessoaRepository;


    @Autowired
    private MessageSource messageSource;
    public Pessoa inserir(Pessoa pessoa){
        return pessoaRepository.save(pessoa);
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

    public List<Pessoa> buscarTodos(){
        return pessoaRepository.findAll();
    }
}


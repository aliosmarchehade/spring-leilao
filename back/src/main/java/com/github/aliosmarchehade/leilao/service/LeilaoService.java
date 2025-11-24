package com.github.aliosmarchehade.leilao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.github.aliosmarchehade.leilao.model.Leilao;
import com.github.aliosmarchehade.leilao.repository.LeilaoRepository;

@Service
public class LeilaoService {

    @Autowired
    private LeilaoRepository repository;

    public Page<Leilao> buscarTodos(Pageable pageable) {
        return repository.findAll(pageable);
    }

    public Leilao buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Leilão não encontrado!"));
    }

    public Leilao inserir(Leilao leilao) {
        return repository.save(leilao);
    }

    public Leilao alterar(Leilao leilao) {
        if (!repository.existsById(leilao.getId())) {
            throw new RuntimeException("Leilão não encontrado!");
        }
        return repository.save(leilao);
    }

    public void deletar(Long id) {
        if (!repository.existsById(id)) {
            throw new RuntimeException("Leilão não encontrado!");
        }
        repository.deleteById(id);
    }
}

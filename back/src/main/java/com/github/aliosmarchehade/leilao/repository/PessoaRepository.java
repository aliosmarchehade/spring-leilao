package com.github.aliosmarchehade.leilao.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import com.github.aliosmarchehade.leilao.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa,Long>{
    boolean existsByEmail(String email);
    public Optional<Pessoa> findByEmail(String email);
}

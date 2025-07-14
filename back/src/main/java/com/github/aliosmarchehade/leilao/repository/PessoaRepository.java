package com.github.aliosmarchehade.leilao.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.github.aliosmarchehade.leilao.model.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa,Long>{
    
}

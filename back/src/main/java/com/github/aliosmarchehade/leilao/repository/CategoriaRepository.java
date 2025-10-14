package com.github.aliosmarchehade.leilao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.aliosmarchehade.leilao.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    
}
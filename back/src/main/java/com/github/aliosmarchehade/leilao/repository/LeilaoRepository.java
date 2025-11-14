package com.github.aliosmarchehade.leilao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.aliosmarchehade.leilao.model.Leilao;

public interface LeilaoRepository extends JpaRepository<Leilao, Long> {

}
package com.github.aliosmarchehade.leilao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.github.aliosmarchehade.leilao.model.LogEvento;

@Repository
public interface LogRepository extends JpaRepository<LogEvento, Long> {
    List<LogEvento> findByUsuarioIdOrderByDataHoraDesc(Long usuarioId);
}

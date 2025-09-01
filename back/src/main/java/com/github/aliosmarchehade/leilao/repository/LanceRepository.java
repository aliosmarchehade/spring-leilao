package com.github.aliosmarchehade.leilao.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.github.aliosmarchehade.leilao.model.Lance;

public interface LanceRepository extends JpaRepository<Lance,Long>{
    
}

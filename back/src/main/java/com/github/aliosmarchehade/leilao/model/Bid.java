package com.github.aliosmarchehade.leilao.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import org.apache.catalina.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class Bid {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private BigDecimal valueBid;

    private LocalDateTime dateTime;

    @ManyToOne
    @JoinColumn(name = "leilao_id")
    private Leilao leilao;

    @ManyToOne
    @JoinColumn(name = "pessoa_id")
    private Pessoa pessoa;
}
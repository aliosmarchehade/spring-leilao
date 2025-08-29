package com.github.aliosmarchehade.leilao.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "lance")
public class Lance {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private float valorLance;
    private LocalDateTime dataHora;

}

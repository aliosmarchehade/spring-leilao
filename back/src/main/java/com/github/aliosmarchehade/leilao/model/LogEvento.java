package com.github.aliosmarchehade.leilao.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LogEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long usuarioId;
    private String acao;
    private LocalDateTime dataHora;

    // exemplo: LOGIN, LOGOUT, CRIAR_LEILAO, DAR_LANCE, etc.
}

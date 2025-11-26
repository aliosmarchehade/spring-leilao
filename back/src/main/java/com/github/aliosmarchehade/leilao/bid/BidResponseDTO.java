package com.github.aliosmarchehade.leilao.bid;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BidResponseDTO {

    private Long id;
    private BigDecimal valueBid;
    private LocalDateTime dateTime;

    private Long userId;
    private String userNome;
    private String userEmail;
}


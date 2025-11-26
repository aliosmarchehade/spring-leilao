package com.github.aliosmarchehade.leilao.bid;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class BidRequestDTO {

    @NotNull(message = "O valor do lance não pode ser nulo")
    @Positive(message = "O valor do lance deve ser positivo")
    private BigDecimal valueBid;

    @NotNull(message = "O ID do leilão não pode ser nulo")
    private Long auctionId;
}
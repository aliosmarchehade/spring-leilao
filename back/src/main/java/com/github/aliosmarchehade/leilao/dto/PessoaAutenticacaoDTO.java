package com.github.aliosmarchehade.leilao.dto;

import lombok.Data;

@Data
public class PessoaAutenticacaoDTO {
    private String nome;
    private String email;
    private String token;
}

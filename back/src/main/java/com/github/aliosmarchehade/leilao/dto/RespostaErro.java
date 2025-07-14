package com.github.aliosmarchehade.leilao.dto;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class RespostaErro {
    private LocalDateTime dataHora;
    private int codigo;
    private String erro;
    private String mensagem;
    private String caminho;
    private List<String> detalhes;

    public RespostaErro(int codigo, String erro, String mensagem, String caminho, List<String> detalhes){
        dataHora = LocalDateTime.now();
        this.codigo = codigo;
        this.erro = erro;
        this.caminho = caminho;
        this.mensagem = mensagem;
        this.detalhes = detalhes;
    }

}

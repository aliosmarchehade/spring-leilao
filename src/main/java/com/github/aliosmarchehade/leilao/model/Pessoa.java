package com.github.aliosmarchehade.leilao.model;
import lombok.Data;


// @Entity
@Data
// @Table(nome = "pessoa")
public class Pessoa {
    // @id
    // @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
    private String email;
    private String senha; 
}

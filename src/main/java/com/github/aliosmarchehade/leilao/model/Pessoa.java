package com.github.aliosmarchehade.leilao.model;
import lombok.Data;
import jakarta.persistence.*;



@Entity
@Data
@Table(name = "pessoa")
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String nome;
    private String email;
    private String senha; 
}

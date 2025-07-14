package com.github.aliosmarchehade.leilao.model;
import lombok.Data;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;



@Entity
@Data
@Table(name = "pessoa")
public class Pessoa {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank(message = "{validation.name.NotBlank}")
    private String nome;
    @Email(message = "{validation.email.notValid}")
    @NotBlank(message = "{validation.email.NotBlank}")
    private String email;
    private String senha; 
}

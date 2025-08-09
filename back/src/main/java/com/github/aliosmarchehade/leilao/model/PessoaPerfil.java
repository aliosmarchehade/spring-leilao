package com.github.aliosmarchehade.leilao.model;
import lombok.Data;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;


@Entity
@Data
@Table(name = "pessoa_perfil")
public class PessoaPerfil {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_perfil")
    private Perfil perfil;

    @ManyToOne
    @JoinColumn(name = "id_pessoa")
    @JsonIgnore
    private Pessoa pessoa;
  
}

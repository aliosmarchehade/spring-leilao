package com.github.aliosmarchehade.leilao.model;
import lombok.Data;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;


@Entity
@Data
@Table(name = "pessoa")
@JsonIgnoreProperties({"authorities","username", "password", "enabled", "credentialsNonExpired","accountNonExpired","accountNonLocked"})
public class Pessoa implements UserDetails{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotBlank(message = "{validation.name.NotBlank}")
    private String nome;
    @Email(message = "{validation.email.notValid}")
    @NotBlank(message = "{validation.email.NotBlank}")
    private String email;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @Column(nullable = false)
    @NotBlank(message = "{validation.senha.NotBlank}")
    private String senha; 

    @Column(name = "codigo_validacao")
    private String codigoValidacao;

    @Column(name = "validade_codigo_validacao")
    private LocalDateTime validadeCodigoValidacao;

    @OneToMany(mappedBy = "pessoa", cascade = CascadeType.ALL, orphanRemoval = true, 
    fetch = FetchType.EAGER)
    private List<PessoaPerfil> pessoaPerfil;

    public void setPessoaPerfil(List<PessoaPerfil> pessoaPerfil){
        for(PessoaPerfil p : pessoaPerfil){
            p.setPessoa(this);
        }
        this.pessoaPerfil = pessoaPerfil;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
   
        return pessoaPerfil.stream().map(user -> new SimpleGrantedAuthority
        (user.getPerfil().getNome())).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    
}

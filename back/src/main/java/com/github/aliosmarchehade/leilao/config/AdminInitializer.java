package com.github.aliosmarchehade.leilao.config;

import com.github.aliosmarchehade.leilao.model.Pessoa;
import com.github.aliosmarchehade.leilao.model.Perfil;
import com.github.aliosmarchehade.leilao.model.PessoaPerfil;
import com.github.aliosmarchehade.leilao.repository.PessoaRepository;
import com.github.aliosmarchehade.leilao.repository.PerfilRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner initAdmin(
            PessoaRepository pessoaRepository,
            PerfilRepository perfilRepository,
            PasswordEncoder passwordEncoder) {

        return args -> {
            // 1 Garante que exista o perfil ADMIN
            Perfil perfilAdmin = perfilRepository.findByNome("ADMIN")
                    .orElseGet(() -> {
                        Perfil novo = new Perfil();
                        novo.setNome("ADMIN");
                        return perfilRepository.save(novo);
                    });

            // 2️ Verifica se a pessoa admin já existe
            if (!pessoaRepository.existsByEmail("admin@example.com")) {

                // Cria a pessoa
                Pessoa admin = new Pessoa();
                admin.setNome("Administrador do Sistema");
                admin.setEmail("admin@example.com");
                admin.setSenha(passwordEncoder.encode("admin123"));

                // Associa perfil ADMIN
                PessoaPerfil pessoaPerfil = new PessoaPerfil();
                pessoaPerfil.setPerfil(perfilAdmin);
                pessoaPerfil.setPessoa(admin);

                admin.setPessoaPerfil(Collections.singletonList(pessoaPerfil));

                pessoaRepository.save(admin);

                System.out.println("✅ Usuário admin criado: admin@example.com / admin123");
            } else {
                System.out.println("ℹ️ Usuário admin já existe.");
            }
        };
    }
}

package com.github.aliosmarchehade.leilao.controller;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class GerarSenha {
    public static void main(String[] args) {
        BCryptPasswordEncoder enconde = new BCryptPasswordEncoder();
        System.out.println("aquiii: " + enconde.encode("123") + " terminou");
    }
}
package com.github.aliosmarchehade.leilao.service;

import org.springframework.stereotype.Service;

import com.github.aliosmarchehade.leilao.model.Calculadora;

@Service
public class HelloService {
    public Calculadora somar(Calculadora calculadora) {
        calculadora.setResultado(calculadora.getValor1() + calculadora.getValor2());
        return calculadora;
    }
}

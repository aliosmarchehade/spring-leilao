package com.github.aliosmarchehade.leilao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.github.aliosmarchehade.leilao.model.Calculadora;
import com.github.aliosmarchehade.leilao.service.HelloService;

@RestController
public class Hello {

    @Autowired
    private HelloService helloService;

    @GetMapping("/")
    public String hello(){
        return "Olá, Spring!";
    }

    @GetMapping("/somar")
    public Integer somar(@RequestParam("v1") Integer valor1, 
                        @RequestParam("v2") Integer valor2){
        return valor1+valor2;
    }

    @PostMapping("/somar")
    public Calculadora somar(@RequestBody Calculadora calculadora){
        calculadora.setResultado(calculadora.getValor1()+
                                calculadora.getValor2());
                        return calculadora;
    }
}

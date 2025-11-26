package com.github.aliosmarchehade.leilao.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;

@Controller
public class BidWebSocketController {

    @MessageMapping("/hello")
    public void hello(String msg) {
        System.out.println("Mensagem recebida do cliente: " + msg);
    }
}
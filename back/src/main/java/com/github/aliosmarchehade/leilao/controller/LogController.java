package com.github.aliosmarchehade.leilao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.github.aliosmarchehade.leilao.model.LogEvento;
import com.github.aliosmarchehade.leilao.service.LogService;

@RestController
@RequestMapping("/logs")
public class LogController {

    @Autowired
    private LogService logService;

    // Buscar todos os logs (ou paginação se preferir)
    @GetMapping
    public ResponseEntity<List<LogEvento>> buscarTodos() {
        return ResponseEntity.ok(logService.buscarTodos());
    }

    // Buscar logs de um usuário específico
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<LogEvento>> buscarPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(logService.buscarPorUsuario(usuarioId));
    }

    // Registrar novo log manualmente (opcional)
    @PostMapping
    public ResponseEntity<LogEvento> inserir(@RequestBody LogEvento log) {
        return ResponseEntity.ok(logService.inserir(log));
    }
}

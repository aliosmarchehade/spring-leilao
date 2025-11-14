package com.github.aliosmarchehade.leilao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.github.aliosmarchehade.leilao.model.Leilao;
import com.github.aliosmarchehade.leilao.service.LeilaoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/leilao")
public class LeilaoController {

    @Autowired
    private LeilaoService leilaoService;

    @GetMapping
    public ResponseEntity<Page<Leilao>> buscarTodos(Pageable pageable) {
        return ResponseEntity.ok(leilaoService.buscarTodos(pageable));
    }

    @PostMapping
    public ResponseEntity<Leilao> inserir(@Valid @RequestBody Leilao leilao) {
        return ResponseEntity.ok(leilaoService.inserir(leilao));
    }

    @PutMapping
    public ResponseEntity<Leilao> alterar(@Valid @RequestBody Leilao leilao) {
        return ResponseEntity.ok(leilaoService.alterar(leilao));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable("id") Long id) {
        leilaoService.deletar(id);
        return ResponseEntity.ok("Leilão excluído!");
    }
}

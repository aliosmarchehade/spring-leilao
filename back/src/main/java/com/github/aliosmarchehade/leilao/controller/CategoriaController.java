package com.github.aliosmarchehade.leilao.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.aliosmarchehade.leilao.model.Categoria;
import com.github.aliosmarchehade.leilao.service.CategoriaService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/categoria")
public class CategoriaController {
    @Autowired
    private CategoriaService categoriaService;

    @GetMapping
    public ResponseEntity<Page<Categoria>> buscarTodos(Pageable pageable) {
        return ResponseEntity.ok(categoriaService.buscarTodos(pageable));
    }

    @PostMapping
    public ResponseEntity<Categoria> inserir(@Valid @RequestBody Categoria pessoa) {
        return ResponseEntity.ok(categoriaService.inserir(pessoa));
    }

    @PutMapping
    public ResponseEntity<Categoria> alterar(@Valid @RequestBody Categoria pessoa) {
        return ResponseEntity.ok(categoriaService.alterar(pessoa));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable("id") Long id) {
        categoriaService.excluir(id);
        return ResponseEntity.ok("Categoria excluída com sucesso!");
    }
}
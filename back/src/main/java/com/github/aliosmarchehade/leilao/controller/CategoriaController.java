package com.github.aliosmarchehade.leilao.controller;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
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
    public ResponseEntity<Categoria> inserir(@Valid @RequestBody Categoria categoria) {
        return ResponseEntity.ok(categoriaService.inserir(categoria));
    }
    
    // ✅ CORRIGIDO: Adicionado /{id} e @PathVariable
    @PutMapping("/{id}")
    public ResponseEntity<Categoria> alterar(
        @PathVariable("id") Long id,
        @Valid @RequestBody Categoria categoria
    ) {
        categoria.setId(id);  // Garante que o ID está correto
        return ResponseEntity.ok(categoriaService.alterar(categoria));
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable("id") Long id) {
        categoriaService.excluir(id);
        return ResponseEntity.ok("Categoria excluída com sucesso!");
    }
}
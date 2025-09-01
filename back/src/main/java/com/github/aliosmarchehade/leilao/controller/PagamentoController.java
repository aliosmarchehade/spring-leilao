package com.github.aliosmarchehade.leilao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.github.aliosmarchehade.leilao.model.Pagamento;

import com.github.aliosmarchehade.leilao.service.PagamentoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/pagamento")
public class PagamentoController {

    @Autowired
    private PagamentoService pagamentoService;

    @GetMapping
    public ResponseEntity <Page<Pagamento>> buscarTodos(Pageable pageable){
        return ResponseEntity.ok(pagamentoService.buscarTodos(pageable));

    }

    @PostMapping
    public ResponseEntity<Pagamento> inserir(@Valid @RequestBody Pagamento pagamento){
        return ResponseEntity.ok(pagamentoService.inserir(pagamento));
    } 

    @PutMapping
    public ResponseEntity<Pagamento> alterar(@Valid @RequestBody Pagamento pagamento){
        return ResponseEntity.ok(pagamentoService.alterar(pagamento));
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable("id")Long id){
        pagamentoService.deletar(id);
        return ResponseEntity.ok("Pagamento excluído!");
    }
}

package com.github.aliosmarchehade.leilao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.aliosmarchehade.leilao.model.Pessoa;
import com.github.aliosmarchehade.leilao.service.PessoaService;

import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;

@RestController
@RequestMapping("/pessoa")
public class PessoaController {

    @Autowired
    private PessoaService pessoaService;

    @GetMapping
    public ResponseEntity <List<Pessoa>> buscarTodos(){
        return ResponseEntity.ok(pessoaService.buscarTodos());

    }

    @PostMapping
    public ResponseEntity<Pessoa> inserir(@Valid @RequestBody Pessoa pessoa){
        return ResponseEntity.ok(pessoaService.inserir(pessoa));
    } 

    @PutMapping
    public ResponseEntity<Pessoa> alterar(@Valid @RequestBody Pessoa pessoa){
        return ResponseEntity.ok(pessoaService.alterar(pessoa));
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity excluir(@PathParam("id")Long id){
        pessoaService.deletar(id);
        return ResponseEntity.ok("Excluido");
    }
}

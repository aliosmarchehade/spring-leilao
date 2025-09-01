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

import com.github.aliosmarchehade.leilao.model.Feedback;
import com.github.aliosmarchehade.leilao.model.Lance;
import com.github.aliosmarchehade.leilao.service.FeedbackService;
import com.github.aliosmarchehade.leilao.service.LanceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/lance")
public class LanceController {

    @Autowired
    private LanceService lanceService;

    @GetMapping
    public ResponseEntity <Page<Lance>> buscarTodos(Pageable pageable){
        return ResponseEntity.ok(lanceService.buscarTodos(pageable));

    }

    @PostMapping
    public ResponseEntity<Lance> inserir(@Valid @RequestBody Lance lance){
        return ResponseEntity.ok(lanceService.inserir(lance));
    } 

    @PutMapping
    public ResponseEntity<Lance> alterar(@Valid @RequestBody Lance lance){
        return ResponseEntity.ok(lanceService.alterar(lance));
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable("id")Long id){
        lanceService.deletar(id);
        return ResponseEntity.ok("Lance excluído!");
    }
}

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
import com.github.aliosmarchehade.leilao.service.FeedbackService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping
    public ResponseEntity <Page<Feedback>> buscarTodos(Pageable pageable){
        return ResponseEntity.ok(feedbackService.buscarTodos(pageable));

    }

    @PostMapping
    public ResponseEntity<Feedback> inserir(@Valid @RequestBody Feedback feedback){
        return ResponseEntity.ok(feedbackService.inserir(feedback));
    } 

    @PutMapping
    public ResponseEntity<Feedback> alterar(@Valid @RequestBody Feedback feedback){
        return ResponseEntity.ok(feedbackService.alterar(feedback));
    } 

    @DeleteMapping("/{id}")
    public ResponseEntity<String> excluir(@PathVariable("id")Long id){
        feedbackService.deletar(id);
        return ResponseEntity.ok("Feedback excluído!");
    }
}

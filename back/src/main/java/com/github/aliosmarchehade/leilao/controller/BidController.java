package com.github.aliosmarchehade.leilao.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.aliosmarchehade.leilao.bid.BidRequestDTO;
import com.github.aliosmarchehade.leilao.bid.BidResponseDTO;
import com.github.aliosmarchehade.leilao.service.BidService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/bids")
public class BidController {

    @Autowired
    private BidService bidService;

    @PostMapping
    public ResponseEntity<BidResponseDTO> criar(@RequestBody @Valid BidRequestDTO dto) {
        return ResponseEntity.ok(bidService.criarLance(dto));
    }

    @GetMapping("/auction/{id}")
    public ResponseEntity<List<BidResponseDTO>> listarPorLeilao(@PathVariable Long id) {
        return ResponseEntity.ok(bidService.listarPorLeilao(id));
    }
}
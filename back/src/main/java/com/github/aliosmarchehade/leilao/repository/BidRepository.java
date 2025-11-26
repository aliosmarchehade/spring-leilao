package com.github.aliosmarchehade.leilao.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.aliosmarchehade.leilao.model.Bid;

public interface BidRepository extends JpaRepository<Bid, Long> {

    List<Bid> findByLeilaoIdOrderByValueBidDesc(Long leilaoId);
}
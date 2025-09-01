package com.github.aliosmarchehade.leilao.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.aliosmarchehade.leilao.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback,Long>{
    
}

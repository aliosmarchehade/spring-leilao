package com.github.aliosmarchehade.leilao.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import com.github.aliosmarchehade.leilao.model.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento,Long>{
    
}

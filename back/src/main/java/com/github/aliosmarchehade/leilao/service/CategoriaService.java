package com.github.aliosmarchehade.leilao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.github.aliosmarchehade.leilao.exception.NaoEncontradoExcecao;
import com.github.aliosmarchehade.leilao.model.Categoria;
import com.github.aliosmarchehade.leilao.repository.CategoriaRepository;



@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private MessageSource messageSource;

    public Categoria inserir(Categoria categoria) {
        Categoria categoriaCadastrado = categoriaRepository.save(categoria);
        return categoriaCadastrado;
    }

    public Categoria alterar(Categoria categoria) {
        Categoria categoriaBanco = buscarPorId(categoria.getId());
        categoriaBanco.setNome(categoria.getNome());

        return categoriaRepository.save(categoriaBanco);
    }

    public void excluir(long id) {
        Categoria categoriaBanco = buscarPorId(id);
        categoriaRepository.delete(categoriaBanco);
    }

    public Categoria buscarPorId(Long id) {
        return categoriaRepository.findById(id)
                .orElseThrow(() -> new NaoEncontradoExcecao(messageSource.getMessage("categoria.notfound",
                        new Object[] { id }, LocaleContextHolder.getLocale())));
    }

    public Page<Categoria> buscarTodos(Pageable pageable) {
        return categoriaRepository.findAll(pageable);
    }

}
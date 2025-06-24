package com.github.aliosmarchehade.leilao.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import com.github.aliosmarchehade.leilao.dto.RespostaErro;

@RestControllerAdvice
public class ExcecaoGlobal {


    @ExceptionHandler(NaoEncontradoExcecao.class)
    public ResponseEntity<RespostaErro>naoEncontrado(NaoEncontradoExcecao ex, WebRequest request){

        RespostaErro respostaErro = new RespostaErro(HttpStatus.NOT_FOUND.value(), "Não Encontrado", 
        ex.getMessage(), request.getDescription(false), null);
        return new ResponseEntity<>(respostaErro, HttpStatus.NOT_FOUND);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<RespostaErro>global(Exception ex, WebRequest request){

        RespostaErro respostaErro = new RespostaErro(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Erro Interno", 
        ex.getMessage(), request.getDescription(false), null);
        return new ResponseEntity<>(respostaErro, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

package com.github.aliosmarchehade.leilao.dto;

public class AlterarSenha {
    private String senhaAtual;
    private String novaSenha;

    public String getSenhaAtual(){
        return senhaAtual;
    }
    public void setSenhaAtual(String senhaAtual){
        this.senhaAtual = senhaAtual;
    }
    public String getNovaSenha(){
        return novaSenha;
    }
    public void setNovaSenha(String novaSenha){
        this.novaSenha = novaSenha;
    }
}

package com.github.aliosmarchehade.leilao.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    @Autowired
    private JavaMailSender javaMail;

    @Autowired
    private TemplateEngine  templateEngine;

    public void enviarEmailSimples(String para, String assunto, String mensagem){
        SimpleMailMessage simpleMail = new SimpleMailMessage();
        simpleMail.setTo(para);
        simpleMail.setSubject(assunto);
        simpleMail.setText(mensagem);
        javaMail.send(simpleMail);
    }

    @Async
    public void emailTemplate(String para, String assunto, Context variaveisEmail, String arquivoTemplate){
        String process = templateEngine.process(arquivoTemplate,variaveisEmail);
        
        MimeMessage message = javaMail.createMimeMessage();
        MimeMessageHelper helper;
        try{
            helper = new MimeMessageHelper(message, true);
            helper.setTo(para);
            helper.setSubject(assunto);
            helper.setText(process, true);
        }
        catch (MessagingException e){
            e.printStackTrace();
        }
        javaMail.send(message);
    }
}

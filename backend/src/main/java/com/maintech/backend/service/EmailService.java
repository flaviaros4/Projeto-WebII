package com.maintech.backend.service;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String mailUsername;


    @Async
    public void enviarEmail(String para, String assunto, String texto) {
        try {
            MimeMessage mensagem = mailSender.createMimeMessage();

            MimeMessageHelper helper = new MimeMessageHelper(mensagem, false, "UTF-8");

            helper.setTo(para);
            helper.setSubject(assunto);
            helper.setText(texto);

            helper.setFrom(new InternetAddress(mailUsername, "MainTech"));

            helper.setReplyTo(mailUsername);

            mailSender.send(mensagem);

            System.out.println("E-mail enviado com sucesso para: " + para);
        } catch (Exception e) {
            System.err.println("Erro ao enviar e-mail para " + para + ": " + e.getMessage());
        }
    }
}
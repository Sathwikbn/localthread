package com.localthread.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendEmail(String to, String subject, String body) {
        System.out.println("\n==================================================");
        System.out.println("[EMAIL SIMULATOR] Sending Outbound Message");
        System.out.println("Recipient: " + to);
        System.out.println("Subject: " + subject);
        System.out.println("Body:\n" + body);
        System.out.println("==================================================\n");
    }
}

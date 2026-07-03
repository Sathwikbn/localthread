package com.localthread.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

@Service
public class FileService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String saveFile(MultipartFile file, String subFolder) throws IOException {
        Path uploadPath = Paths.get(uploadDir, subFolder);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        String ext = "";
        String original = file.getOriginalFilename();
        if (original != null && original.contains(".")) {
            ext = original.substring(original.lastIndexOf('.'));
        }
        String fileName = UUID.randomUUID().toString() + ext;
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return "/uploads/" + subFolder + "/" + fileName;
    }
}

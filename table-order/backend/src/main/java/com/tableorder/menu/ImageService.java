package com.tableorder.menu;

import com.tableorder.common.exception.BusinessException;
import com.tableorder.menu.dto.ImageUploadResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;
import java.util.UUID;

@Service
public class ImageService {

    private static final Set<String> ALLOWED_EXTENSIONS = Set.of("jpg", "jpeg", "png", "gif", "webp");
    private final Path uploadPath;

    public ImageService(@Value("${app.upload.path}") String uploadDir) {
        this.uploadPath = Paths.get(uploadDir);
        try { Files.createDirectories(this.uploadPath); } catch (IOException ignored) {}
    }

    public ImageUploadResponse upload(MultipartFile file) {
        if (file.isEmpty()) throw new BusinessException("INVALID_FILE", "파일이 비어있습니다");

        String originalName = file.getOriginalFilename();
        String ext = originalName != null && originalName.contains(".")
                ? originalName.substring(originalName.lastIndexOf(".") + 1).toLowerCase() : "";
        if (!ALLOWED_EXTENSIONS.contains(ext)) {
            throw new BusinessException("INVALID_FILE_TYPE", "허용되지 않는 파일 형식입니다 (jpg, png, gif, webp)");
        }

        String filename = UUID.randomUUID() + "." + ext;
        try {
            Files.copy(file.getInputStream(), uploadPath.resolve(filename));
        } catch (IOException e) {
            throw new BusinessException("FILE_UPLOAD_FAILED", "파일 업로드에 실패했습니다");
        }
        return new ImageUploadResponse("/api/images/" + filename);
    }
}

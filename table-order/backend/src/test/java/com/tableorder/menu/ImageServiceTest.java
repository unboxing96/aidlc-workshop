package com.tableorder.menu;

import com.tableorder.common.exception.BusinessException;
import com.tableorder.menu.dto.ImageUploadResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.mock.web.MockMultipartFile;

import java.nio.file.Path;

import static org.assertj.core.api.Assertions.*;

class ImageServiceTest {

    private ImageService imageService;
    @TempDir Path tempDir;

    @BeforeEach
    void setUp() {
        imageService = new ImageService(tempDir.toString());
    }

    @Test
    void 업로드_성공() {
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", "image/jpeg", "data".getBytes());
        ImageUploadResponse res = imageService.upload(file);
        assertThat(res.getImageUrl()).startsWith("/api/images/").endsWith(".jpg");
    }

    @Test
    void 빈_파일() {
        MockMultipartFile file = new MockMultipartFile("file", "test.jpg", "image/jpeg", new byte[0]);
        assertThatThrownBy(() -> imageService.upload(file)).isInstanceOf(BusinessException.class);
    }

    @Test
    void 허용되지_않는_확장자() {
        MockMultipartFile file = new MockMultipartFile("file", "test.exe", "application/octet-stream", "data".getBytes());
        assertThatThrownBy(() -> imageService.upload(file)).isInstanceOf(BusinessException.class);
    }
}

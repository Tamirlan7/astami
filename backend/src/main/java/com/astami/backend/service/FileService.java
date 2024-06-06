package com.astami.backend.service;

import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.exception.CustomInternalServerException;
import com.astami.backend.model.File;
import com.astami.backend.repository.FileRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Objects;
import java.util.UUID;

@Service
public class FileService {
    private final FileRepository fileRepository;
    private static final Path root = Paths.get("files");
    private static final Logger LOGGER = LoggerFactory.getLogger(FileService.class);

    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
        this.init();
    }

    private void init() {
        if (!Files.exists(root)) {
            try {
                Files.createDirectory(root);
            } catch (IOException e) {
                LOGGER.error(e.getMessage(), e);
                throw new CustomInternalServerException("Unable to create root directory {fileService}");
            }
        }
    }

    @Transactional
    public File saveFile(MultipartFile file, Path path) {
        try {
            // Ensure the file has content
            if (file.isEmpty()) {
                throw new CustomInternalServerException("Failed to store empty file.");
            }

            // Normalize the file name
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            // Generate a unique file name to prevent overwriting
            String uniqueFileName = generateUniqueFileName(fileName);

            // Resolve the target path
            Path targetDirectory = root.resolve(path);
            Path targetLocation = targetDirectory.resolve(uniqueFileName);

            // Ensure the parent directories exist
            if (!Files.exists(targetDirectory)) {
                Files.createDirectories(targetDirectory);
            }

            // Copy file to the target location
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);

            // Save file information to the database
            File fileInfo = File.builder()
                    .name(uniqueFileName)
                    .type(file.getContentType())
                    .path(targetLocation.toString())
                    .build();
            fileInfo = fileRepository.save(fileInfo);

            return fileInfo;
        } catch (IOException e) {
            LOGGER.error("Failed to store file {}", file.getOriginalFilename(), e);
            throw new CustomInternalServerException("Failed to store file " + file.getOriginalFilename());
        }
    }

    private String generateUniqueFileName(String fileName) {
        // Extract file extension
        String fileExtension = StringUtils.getFilenameExtension(fileName);
        // Generate a unique file name
        String uniqueID = UUID.randomUUID().toString();
        // Append extension to the unique ID
        return uniqueID + "." + fileExtension;
    }

    public Resource load(Path path) {
        try {
            Resource resource = new UrlResource(path.toUri());

            if (resource.exists() || resource.isReadable()) {
                return resource;
            } else {
                throw new CustomBadRequestException("Такого файла не существует");
            }
        } catch (MalformedURLException e) {
            LOGGER.error(e.getMessage(), e);
            throw new CustomBadRequestException("Ошибка: " + e.getMessage());
        }
    }

}

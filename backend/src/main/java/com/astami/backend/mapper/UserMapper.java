package com.astami.backend.mapper;

import com.astami.backend.dto.UserDto;
import com.astami.backend.model.User;

public class UserMapper {

    public static UserDto mapToDto(User user) {
        if (user == null) return null;

        return UserDto.builder()
                .id(user.getId())
                .role(user.getRole())
                .email(user.getEmail())
                .phone(user.getPhone())
                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }

}

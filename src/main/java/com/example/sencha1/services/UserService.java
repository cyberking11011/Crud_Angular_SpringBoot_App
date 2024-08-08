/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.sencha1.services;

import com.example.sencha1.entities.User;
import com.example.sencha1.repositories.UserRepository;

import java.util.List;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 *
 * @author ShahR-PC
 */
@RequiredArgsConstructor
@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService implements IUserService {

    UserRepository userRepository;

    @Override
    public User create(User user) {

        User newUser;
        if (user.getName() != null || user.getSurname() != null) {
            newUser = User.builder()
                    .name(user.getName())
                    .surname(user.getSurname())
                    .email(user.getEmail())
                    .salary(user.getSalary())
                    .build();

            return userRepository.save(newUser);
        }
        
        return null;

    }

    @Override
    public List<User> listUser() {
        return userRepository.findAll();

    }

    @Override
    public Page<User> pagedUsers(Pageable pageable) {

        return userRepository.findAllByOrderByIdAsc(pageable);
    }

    @Override
    public List<User> findUsersByName(String name) {
        return userRepository.findAllByName(name).orElseThrow(() -> new RuntimeException("Users not found"));
    }

    @Override
    public User findUserById(UUID id) {
        return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public Page<User> findPagedUsersByName(String name, Pageable pageable) {
        return userRepository.findAllPagedByName(name, pageable)
                .orElseThrow(() -> new RuntimeException("Users not found"));
    }

    @Override
    public User updateUser(UUID id, User user) {
        User newUser = userRepository.findById(id).orElseThrow();
        newUser.setName(user.getName());
        newUser.setSurname(user.getSurname());
        newUser.setEmail(user.getEmail());
        newUser.setSalary(user.getSalary());

        return userRepository.save(newUser);

    }

    @Override
    public User deleteUser(UUID id) {
        User user = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found by: " + id));
        userRepository.delete(user);
        return user;
    }

}

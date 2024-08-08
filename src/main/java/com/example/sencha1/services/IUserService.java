/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.sencha1.services;

import com.example.sencha1.entities.User;

import java.util.List;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 *
 * @author ShahR-PC
 */
public interface IUserService {

    User create(User user);

    List<User> listUser();

    Page<User> pagedUsers(Pageable pageable);

    User findUserById(UUID id);

    List<User> findUsersByName(String name);

    Page<User> findPagedUsersByName(String name, Pageable pageable);

    User updateUser(UUID id, User user);

    User deleteUser(UUID id);
}

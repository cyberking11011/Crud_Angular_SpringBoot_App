/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.example.sencha1.repositories;

import com.example.sencha1.entities.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author ShahR-PC
 */
@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

    @Query("Select u from User u Where lower(u.name) like lower(concat('%', ?1,'%'))")
    Optional<List<User>> findAllByName(String name);
    

    @Query("Select u from User u Where lower(u.name) like lower(concat('%', ?1,'%'))")
    Optional<Page<User>> findAllPagedByName(String name, Pageable pageable);

    Page<User> findAllByOrderByIdAsc(Pageable pageable);


}

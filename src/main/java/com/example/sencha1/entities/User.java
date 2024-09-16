package com.example.sencha1.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;

import java.util.UUID;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.*;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 *
 * @author ShahR-PC
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    String name;
    String surname;
    @Email
    String email;
    Double salary;
	
    
    
}

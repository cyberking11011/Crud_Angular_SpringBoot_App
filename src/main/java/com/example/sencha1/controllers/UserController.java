package com.example.sencha1.controllers;

import com.example.sencha1.entities.User;
import com.example.sencha1.services.ExcelService;
import com.example.sencha1.services.UserService;

import java.io.File;
import java.util.List;
import java.util.UUID;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ShahR-PC
 */
@CrossOrigin
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    UserService userService;
    ExcelService excelService;

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        return ResponseEntity.ok(userService.create(user));
    }

    @GetMapping
    public ResponseEntity<List<User>> listUser() {
        return ResponseEntity.ok(userService.listUser());
    }

    @GetMapping("/paged")
    public ResponseEntity<Page<User>> pagedUsers(Pageable pageable) {
        return ResponseEntity.ok(userService.pagedUsers(pageable));
    }

    @GetMapping("/name")
    public ResponseEntity<List<User>> findUsersByName(@RequestParam("name") String name) {
        return ResponseEntity.ok(userService.findUsersByName(name));

    }

    @GetMapping("{id}")
    public ResponseEntity<User> findUserById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(userService.findUserById(id));

    }

    @GetMapping("/paged/name")
    public ResponseEntity<Page<User>> findPagedUsersByName(@RequestParam("name") String name, Pageable pageable) {
        return ResponseEntity.ok(userService.findPagedUsersByName(name, pageable));
    }

    @PutMapping("{id}")
    public ResponseEntity<User> update(@PathVariable(name = "id") UUID id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateUser(id, user));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<User> delete(@PathVariable(name = "id") UUID id) {
        return ResponseEntity.ok(userService.deleteUser(id));
    }

    @PostMapping(value = "/export-excel")
    public ResponseEntity<File> exportExcel(
        @RequestParam("search") String search,
        @RequestParam("path") String path,
        @RequestParam("file_name") String fileName,
        @RequestBody List<String> headers) {
            
        return ResponseEntity.ok(excelService.exportExcel(search,path,fileName,headers));
    }
}

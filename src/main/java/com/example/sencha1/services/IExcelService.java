package com.example.sencha1.services;

import java.util.List;

import org.springframework.core.io.InputStreamResource;

public interface IExcelService {
    InputStreamResource exportExcel(String userName, String path, String fileName, List<String> headers);
}

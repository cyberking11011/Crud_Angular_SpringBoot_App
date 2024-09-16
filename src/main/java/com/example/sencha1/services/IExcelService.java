package com.example.sencha1.services;

import java.io.File;
import java.util.List;

import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public interface IExcelService {
    File exportExcel(String userName,String path,String fileName, List<String> headers);
}

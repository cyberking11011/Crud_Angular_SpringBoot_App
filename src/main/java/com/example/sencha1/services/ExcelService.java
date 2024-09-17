package com.example.sencha1.services;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import com.example.sencha1.entities.User;

import lombok.AccessLevel;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Data
@RequiredArgsConstructor
@Service
public class ExcelService implements IExcelService {

    UserService userService;

    @Override
    public InputStreamResource exportExcel(String userName, String path, String fileName, List<String> headers) {
        int i = 0;

        DateTimeFormatter dateFormat = DateTimeFormatter.ofPattern("dd-MM-yyyy" + "-HH-MM-SS");
        LocalDateTime date = LocalDateTime.now();
        File excel = new File(path + "/" + fileName + date.format(dateFormat) + ".xlsx");

        // Get all filtered data
        List<User> users = userService.findUsersByName(userName);

        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet();

        // Set color
        XSSFColor purple = new XSSFColor(IndexedColors.VIOLET, null);
        // Cell style
        CellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setBorderBottom(BorderStyle.DOUBLE);
        cellStyle.setBorderRight(BorderStyle.DASHED);
        cellStyle.setBorderLeft(BorderStyle.DASHED);
        cellStyle.setBorderTop(BorderStyle.DASHED);
        cellStyle.setFillBackgroundColor(purple.getIndex());
        // Header
        XSSFRow rowHeader = sheet.createRow(0);
        for (String h : headers) {
            XSSFCell cellHeader = rowHeader.createCell(i++);
            cellHeader.setCellValue(h);
            cellHeader.setCellStyle(cellStyle);
        }

        // DATA
        int y = 1;
        for (User user : users) {

            XSSFRow rowData = sheet.createRow(y++);
            int z = 0;
            for (String h : headers) {
                XSSFCell cellData = rowData.createCell(z++);
                cellData.setCellStyle(cellStyle);
                switch (z) {
                    case 1 ->
                        cellData.setCellValue(user.getId().toString());
                    case 2 ->
                        cellData.setCellValue(user.getName());
                    case 3 ->
                        cellData.setCellValue(user.getSurname());
                    case 4 ->
                        cellData.setCellValue(user.getEmail());

                    default ->
                        cellData.setCellValue(user.getSalary());
                }

            }
        }
        // Write to excel
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try {

            // FileOutputStream fos = new FileOutputStream(excel);
            // workbook.write(fos);
            // workbook.close();

            workbook.write(bos);
            workbook.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
        ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
        InputStreamResource resource = new InputStreamResource(bis);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + fileName + ".xlsx");
        httpHeaders.add(HttpHeaders.CONTENT_TYPE, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        return resource;
    }

}

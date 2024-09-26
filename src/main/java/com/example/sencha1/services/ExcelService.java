package com.example.sencha1.services;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

import org.apache.poi.ss.usermodel.BorderStyle;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.FillPatternType;
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

        // Get all filtered data
        List<User> users = userService.findUsersByName(userName);

        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet();

        // Set color
        XSSFColor purple = new XSSFColor(IndexedColors.VIOLET, null);
        // Cell header style
        CellStyle headerCellStyle = workbook.createCellStyle();
        headerCellStyle.setBorderBottom(BorderStyle.DOUBLE);
        headerCellStyle.setBorderRight(BorderStyle.DOUBLE);
        headerCellStyle.setBorderLeft(BorderStyle.DOUBLE);
        headerCellStyle.setBorderTop(BorderStyle.DOUBLE);
        headerCellStyle.setFillBackgroundColor(purple.getIndex());
        headerCellStyle.setFillPattern(FillPatternType.LESS_DOTS);

        // Cell body style
        CellStyle bodyCellStyle = workbook.createCellStyle();
        bodyCellStyle.setBorderBottom(BorderStyle.DOUBLE);
        bodyCellStyle.setBorderRight(BorderStyle.DOUBLE);
        bodyCellStyle.setBorderLeft(BorderStyle.DOUBLE);
        bodyCellStyle.setBorderTop(BorderStyle.DOUBLE);
        // bodyCellStyle.setFillBackgroundColor(purple.getIndex());
        bodyCellStyle.setFillPattern(FillPatternType.NO_FILL);

        // Header
        XSSFRow rowHeader = sheet.createRow(0);
        for (String h : headers) {
            XSSFCell cellHeader = rowHeader.createCell(i++);
            cellHeader.setCellValue(h);
            cellHeader.setCellStyle(headerCellStyle);
        }

        // DATA
        int y = 1;
        for (User user : users) {

            XSSFRow rowData = sheet.createRow(y++);
            int z = 0;
            for (int h = 0; h < headers.size(); h++) {
                XSSFCell cellData = rowData.createCell(z++);
                cellData.setCellStyle(bodyCellStyle);
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

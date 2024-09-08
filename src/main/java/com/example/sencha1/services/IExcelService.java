package com.example.sencha1.services;

import java.io.File;
import java.util.List;
import java.util.Optional;

public interface IExcelService {
    File exportExcel(String userName, List<String> headers);
}

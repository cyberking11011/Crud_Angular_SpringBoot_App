import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExportExcelService {

  constructor(private http:HttpClient) { }

   headers=[
    "ID",
    "Name",
    "Surname",
    "Email",
    "Salary"

  ];

  exportExcel(){
    
  }

}

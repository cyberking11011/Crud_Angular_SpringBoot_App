import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserComponent } from '../componenets/user/user.component';
import { WorkBook } from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
  
  constructor(private http: HttpClient) {}

  headers = ["ID", "Name", "Surname", "Email", "Salary"];

  exportExcel(search:string,path:string,fileName:string):Observable<any> {
    // const headers=new HttpHeaders()
    // .set('ID','ID')
    // .set('Name','Name')
    // .set('Surname','Surname')
    // .set('Email','Email')
    // .set('Salary','Salary');

    const params = new HttpParams()
      .set('search', search)
      .set('path', path)
      .set("file_name",fileName);

   return this.http.post(
      'http://localhost:8080/api/v1/users/export-excel',
      this.headers,
      {params:params},
     
      
    );
  }
}

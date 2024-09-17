import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserComponent } from '../componenets/user/user.component';

import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService {
  constructor(private http: HttpClient) {}

  headers = ['ID', 'Name', 'Surname', 'Email', 'Salary'];

  exportExcel(search: string, path: string, fileName: string): Observable<void> {
    // const headers=new HttpHeaders()
    // .set('ID','ID')
    // .set('Name','Name')
    // .set('Surname','Surname')
    // .set('Email','Email')
    // .set('Salary','Salary');

    const params = new HttpParams()
      .set('search', search)
      .set('path', path)
      .set('file_name', fileName);

    return this.http
      .post('http://localhost:8080/api/v1/users/export-excel', this.headers, {
        params: params,
        responseType: 'blob',
      }).pipe(
        map(blob => {
          const file = new File([blob], fileName + '.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(file);
        })
      );
  }
}

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UserComponent } from '../componenets/user/user.component';

import { saveAs } from 'file-saver';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class ExportExcelService{
  constructor(private http: HttpClient ) {}
  
  headers:string[]=[];
  headersEN = ['ID', 'Name', 'Surname', 'Email', 'Salary'];
  headersAZ = ['ID', 'Ad', 'Soyad', 'E-poçt', 'Maaş'];
  

  exportExcel(search: string, path: string, fileName: string): Observable<any> {
  
    const header=new HttpHeaders()
    .set('Access-Control-Allow-Origin', 'http://localhost:4200' );

    const params = new HttpParams()
      .set('search', search)
      .set('path', path)
      .set('file_name', fileName);

    return this.http
      .post('http://localhost:8080/api/v1/users/export-excel', window.localStorage.getItem('language')==='en'?this.headers=this.headersEN:this.headers=this.headersAZ, {
        params: params,
        headers:header,
        responseType: 'blob',
      }).pipe(
        map(blob => {
          const file = new File([blob], fileName + '.xlsx', { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(file);
        })
      );
  }
}

import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserModel } from '../models/user-model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteUserComponent } from '../componenets/delete-user/delete-user.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  users: any;
  user: UserModel = {
    id: '',
    name: '',
    surname: '',
    email: '',
    salary: 0,
  };
  url: string = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient, private deleteDialog: MatDialog) {}

  getUsers(): Promise<any> {
    return this.http
      .get<UserModel[]>(this.url)
      .toPromise()
      .then((result) => {
         return result;
         
      });
  }
  createUser(user: UserModel) {
    return this.http
      .post<UserModel>(this.url, user)
      .toPromise()
      .then((result) => {
        result;
      });
  }

  updateUser(id: string, user: UserModel) {
    return this.http
      .put<UserModel>(`${this.url}` + '/' + `${id}`, user)
      .toPromise()
      .then((result) => {
        console.log(result);
        this.user = user;
      });
  }
  getUserById(id: string) {
    return this.http
      .get<UserModel>(`${this.url}` + '/' + `${id}`)
      .toPromise()
      .then((result) => {
        return result;
      });
  }

  deleteUser(id: string, user: UserModel) {
    return this.http
      .delete<UserModel>(`${this.url}` + '/' + `${id}`)
      .toPromise()
      .then((result) => {
        return result;
      });
  }

  searchByName(name: string): Promise<any> {
    return this.http
      .get<UserModel>(`${this.url}/name`, {
        params: new HttpParams().set('name', name),
      })
      .toPromise()
      .then((result) => {
        return result;
      });
  }
}

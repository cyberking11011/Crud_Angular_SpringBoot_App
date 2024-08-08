import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortHeader } from '@angular/material/sort';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { I18NHtmlParser } from '@angular/compiler';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  users: UserModel[] = [];
  user: UserModel = {
    id: '',
    name: '',
    surname: '',
    email: '',
    salary: 0,
  };

  searchValue: string = '';

  displayedColumns: string[] = [
    'id',
    'name',
    'surname',
    'email',
    'salary',
    'update',
    'delete',
  ];

  dataSource!: MatTableDataSource<any>;

  constructor(
    private userService: UserService,
    private router: Router,
    private deleteDialog: MatDialog
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): any {
    return this.userService
      .getUsers()
      .then((result) => {
        result;

        this.dataSource = new MatTableDataSource(result);

        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => {});
  }

  searchByName(name: string): any {
    name = this.searchValue;
    return this.userService
      .searchByName(name)
      .then((result) => {
        this.dataSource = new MatTableDataSource(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch((err) => {});
  }
  openDeleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    user: UserModel
  ): void {
    this.deleteDialog.open(DeleteUserComponent, {
      data: { user: user },

      panelClass: 'custom-delete-dialog',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { ExportExcelService } from 'src/app/services/export-excel.service';
import { saveAs } from '@progress/kendo-file-saver';

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
  path: string = 'C:/Users/user/Desktop';
  fileName:string='';

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
    private window: Window,
    private userService: UserService,
    private router: Router,
    private deleteDialog: MatDialog,
    private excelService: ExportExcelService
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
        this.users = result;

        this.dataSource = new MatTableDataSource(this.users);

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

  printUser() {
    this.window.print();
  }
  pdfGenerator() {
    let pdf = new jsPDF('p', 'pt', 'a4');

    pdf.setFont('Roboto-Regular', 'normal');

    autoTable(pdf, { html: '#user-table' });

    pdf.save('home.pdf');
  }

  excelGenerator(search:string,path:string,fileName:string) {
    
    this.excelService
      .exportExcel(this.searchValue, this.path,this.fileName)
      .subscribe((excel) => {
        

       
      });
  }
}

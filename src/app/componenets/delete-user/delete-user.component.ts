import {
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { UserComponent } from '../user/user.component';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/models/user-model';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css'],
})
export class DeleteUserComponent {
  user: any;

  userID: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private modal: NgbModal,
    private deleteDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userID = this.route.snapshot.paramMap.get('id');
    if (this.userID) {
      this.getUserById(this.userID);
    }
  }

  ngOnInit(): void {
   
  }

  getUserById(id: string) {
    return this.userService
      .getUserById(id)
      .then((result) => {
        this.user = result;
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteUser(id: string, user: UserModel) {
    
      this.userService
        .deleteUser(id, user)
        .then((result) => {
          
          
        })
        .catch((err) => {
          console.log(err.message);
        });
  
  }

  closeDialog() {
    this.deleteDialog.closeAll();
  }
}

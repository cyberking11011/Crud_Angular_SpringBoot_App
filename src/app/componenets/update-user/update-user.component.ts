import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from '../user/user.component';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css'],
})
export class UpdateUserComponent implements OnInit {
  user: any;

  userID: any;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) {
    const selectedLang = localStorage.getItem('language') || 'az';
    this.translateService.use(selectedLang);

    this.userID = this.route.snapshot.paramMap.get('id');
    if (this.userID) {
      this.getUserById(this.userID);
    }
  }

  ngOnInit(): void {}

  getUserById(id: string) {
    return this.userService
      .getUserById(id)
      .then((result) => {
        // return result;
        this.user = result;
        //  console.log(result);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateUser(user: UserModel) {
    return this.userService.updateUser(this.userID, this.user).then((value) => {
      this.router.navigateByUrl(`/users`);
    });
  }
}

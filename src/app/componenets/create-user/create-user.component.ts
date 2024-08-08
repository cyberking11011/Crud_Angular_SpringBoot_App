import {
  Component,
  Inject,
  inject,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  user: UserModel = {
    id: '',
    name: '',
    surname: '',
    email: '',
    salary: 0,
  };

  constructor(
    private userService: UserService,
    private router: Router,
    private translateService: TranslateService
  ) {
    const selectedLang = localStorage.getItem('language') || 'az';
    this.translateService.use(selectedLang);
  }
  ngOnInit(): void {}

  create(user: UserModel) {
    return this.userService
      .createUser(user)
      .then((result) => {
        this.router.navigateByUrl(`/users`);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserModel } from 'src/app/models/user-model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class ChartsComponent implements OnInit {
  ngOnInit(): void {}

  constructor(
    private userService: UserService,
    private translateService: TranslateService
  ) {
    const selectedLang = localStorage.getItem('language') || 'az';
    console.log(selectedLang);
    this.translateService.use(selectedLang);

    let names: string[] = [];
    let salaries: number[] = [];

    userService
      .getUsers()
      .then((result) => {
        this.users = result;
        for (let user of this.users) {
          names.push(user.name);
          salaries.push(user.salary);
        }
        this.data = {
          labels: names,
          datasets: [
            {
              data: salaries,
            },
          ],
        };
      })
      .catch((err) => {});
  }

  data: any;
  users!: UserModel[];
}

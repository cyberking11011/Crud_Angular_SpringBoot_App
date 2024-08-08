import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  constructor(private translateService: TranslateService) {}

  sidebar = [
    {
      key: '0',
      label: 'User.left-sidebar.menu.title',
      type: 'default',
      icon: 'pi pi-fw pi-inbox',

      children: [
        {
          key: '0-0',
          label: 'User.left-sidebar.menu.home.title',
          data: '/users',
          type: 'url',
          icon: 'pi pi-fw pi-home',
          target: '_parent',
        },
        {
          key: '0-1',
          label: 'User.left-sidebar.menu.create-user.title',
          data: '/create-user',
          type: 'url',
          icon: 'pi pi-fw pi-save',
          target: '_blank',
        },
      ],
    },
    {
      key: '1',
      label: 'User.left-sidebar.chart.title',
      type: 'default',
      icon: 'pi pi-fw pi-chart-pie',
      children: [
        {
          key: '1-0',
          label: 'User.left-sidebar.chart.user-chart.title',
          data: '/charts',
          type: 'url',
          icon: 'pi pi-fw pi-chart-pie',
          target: '_blank',
          children: [
            {
              key: '1-0-0',
              label: 'User.left-sidebar.chart.user-statistic.title',
              data: '/statistic',
              type: 'url',
              icon: 'pi pi-fw pi-chart-line',
              target: '_blank',
            },
          ],
        },
      ],
      
    },
  ];

  getFiles() {
    return Promise.resolve(this.sidebar);
  }
}

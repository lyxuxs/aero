import { Component } from '@angular/core';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
    menuItems = [
      {
        path:'',
        icon:'bi bi-stoplights',
      },
      {
        path:'/webcam',
        icon:'bi bi-webcam',
      },
      {
        path:'/parking',
        icon:'bi bi-p-square',
      },
      {
        path:'/charging',
        icon:'bi bi-ev-station',
      },
      {
        path:'/construction',
        icon:'bi bi-cone-striped',
      },
      {
        path:'/warning',
        icon:'bi bi-exclamation-diamond',
      },

    ]
}

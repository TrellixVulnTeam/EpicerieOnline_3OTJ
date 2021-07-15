import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css'],

})
export class NotificationComponent {



  isHide = false;
  onHide() {
    this.isHide = !this.isHide
  }




}

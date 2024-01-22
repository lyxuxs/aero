// popup.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() isVisible: boolean = false;
  receivedData: string = '';

  receiveDataFromChild(data: string) {
    this.receivedData = data;
    console.log(data);
  }

  closePopup() {
    this.isVisible = false;
  }
}

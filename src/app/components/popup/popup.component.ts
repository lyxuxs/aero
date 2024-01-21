// popup.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() isVisible: boolean = false;

  message: string = '';
  receiveMessage($event: string) {
    this.message = $event
    console.log(this.message);
    
    this.isVisible = true
  }
  popupVisible: boolean = false;
  dataFromCharging: string = '';
  handleDataFromCharging(data: string) {
    
    this.dataFromCharging = data;
    this.popupVisible = true;
  }
  closePopup() {
    this.isVisible = false;
  }
}

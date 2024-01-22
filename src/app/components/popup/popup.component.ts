// popup.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() isVisible: boolean = false;
  @Input() selectedRoad: string = '';
  
  closePopup() {
    this.isVisible = false;
  }
}

import { Component,Input  } from '@angular/core';

@Component({
  selector: 'app-marker-popup',
  templateUrl: './marker-popup.component.html',
  styleUrl: './marker-popup.component.css'
})
export class MarkerPopupComponent {
  @Input() details: string | undefined;
}

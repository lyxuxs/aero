import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import DataManage from '../../data/DataManage';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() selectedToggleData: string = '';
  Stations: any = undefined;
  heyWaysData: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedToggleData'] && !changes['selectedToggleData'].firstChange) {
      this.station();
    }
  }

  closePopup() {
    this.isVisible = false;
  }

  async station() {
    try {
      console.log("working...");
      const dataManager = new DataManage(`${this['selectedToggleData']}`);
      const dataArray = await dataManager.functionLorryParking();
      const data = dataArray.flat();
      this.Stations = data;
      console.log("Station is:", this.Stations);
    } catch (error) {
      console.error('Error fetching lorry parking station data:', error);
    }
  }
  
}
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import DataManage from '../../data/DataManage';

@Component({
  selector: 'app-mapsider',
  templateUrl: './mapsider.component.html',
  styleUrls: ['./mapsider.component.css']  // Use 'styleUrls' instead of 'styleUrl'
})
export class MapsiderComponent  implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() selectedToggleData: string = '';
  Stations: any = undefined;
  heyWaysData: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedToggleData'] && !changes['selectedToggleData'].firstChange) {
      this.station();
    }
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
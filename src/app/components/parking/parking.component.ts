import { Component, EventEmitter, Output } from '@angular/core';
import { functionGetAllHighways } from '../../data/AllHighWays';
import DataManage from '../../data/DataManage';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css'
})

export class ParkingComponent {
  Stations: any[] = [];
  heyWaysData: any[] = [];
  selectedRoad: string = '';
  selectedToggleData: string = '';


  @Output() sendDataToParent = new EventEmitter<string>();

  isPopupVisible: boolean = false;

  togglePopup(markerPosition: google.maps.LatLngLiteral) {
    this.isPopupVisible = !this.isPopupVisible;
    for (let i = 0; i < this.Stations.length; i++) {
      for (
        let index = 0;
        index < this.Stations[i].data.parking_lorry.length;
        index++
      ) {
        if (
          this.Stations[i].data.parking_lorry[index].coordinate
            .lat == markerPosition.lat &&
          this.Stations[i].data.parking_lorry[index].coordinate
            .long == markerPosition.lng
        ) {
          this.selectedToggleData =`details/parking_lorry/${this.Stations[i].data.parking_lorry[index].identifier}`;
          this.sendDataToParent.emit(`details/parking_lorry/${this.selectedToggleData}`);
          break;
        }
      }
    }
  }
  ngOnInit(): void {
    this.Roades();
  }

  onSelectedRoadChange() {
    this.station(this.selectedRoad);
  }

  async Roades() {
    try {
      const heyWaysData = await functionGetAllHighways();
      console.log("functionGetAllHighways", heyWaysData);
      this.heyWaysData = heyWaysData?.roads || [];
    } catch (error) {
      console.error('Error fetching highways data:', error);
    }
  }

  
  async station( selectedRoad: string) {
    try {
      const dataManager = new DataManage(`${selectedRoad}/services/parking_lorry`);
      const dataArray = await dataManager.functionLorryParking();
      this.Stations = dataArray.flat();
      this.MarkerPositions = [];

      for (let i = 0; i < this.Stations.length; i++) {
        // console.log("this.LorryParkingStations[i]", this.LorryParkingStations[i].data.parking_lorry);
        for (let index = 0; index < this.Stations[i].data.parking_lorry.length; index++) {
          this.MarkerPositions.push({
            lat: parseFloat(this.Stations[i].data.parking_lorry[index].coordinate.lat),
            lng: parseFloat(this.Stations[i].data.parking_lorry[index].coordinate.long)
          });
        }
      }

    } catch (error) {
      console.error('Error fetching lorry parking station data:', error);
    }
  }



  center: google.maps.LatLngLiteral = {
    lat: 51.165691,
    lng: 10.451526
  };
  zoom = 8;

  iconUrl = '../../assets/svg/parking.svg';

  MarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: this.iconUrl,
      scaledSize: new google.maps.Size(60, 60)
    },
  };

  MarkerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent, isChargingStation: boolean) {
    if (event.latLng != null) {
      const position = event.latLng.toJSON();
      if (isChargingStation) {
      } else {
        this.MarkerPositions.push(position);
      }
    }
  }
}
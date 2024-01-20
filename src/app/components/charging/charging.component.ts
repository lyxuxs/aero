import { Component, OnInit } from '@angular/core';
import { functionGetAllHighways } from '../../data/AllHighWays';
import DataManage from '../../data/DataManage';

@Component({
  selector: 'app-charging',
  templateUrl: './charging.component.html',
  styleUrls: ['./charging.component.css']
})
export class ChargingComponent implements OnInit {

  Stations: any[] = [];
  heyWaysData: any[] = [];
  selectedRoad: string = '';
  map: google.maps.Map | undefined;
  infoWindows: google.maps.InfoWindow[] = [];

  ngOnInit(): void {
    this.Roades();
    this.infoWindows = [];
    this.map = new google.maps.Map(document.getElementById('map')!, {
      center: this.center,
      zoom: this.zoom,
    });
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

  async station(selectedRoad: string) {
    try {
      const dataManager = new DataManage(`${selectedRoad}/services/electric_charging_station`);
      const dataArray = await dataManager.functionLorryParking();
      this.Stations = dataArray.flat();
      this.MarkerPositions = [];

      for (let i = 0; i < this.Stations.length; i++) {
        for (let index = 0; index < this.Stations[i].data.electric_charging_station.length; index++) {
          const markerPosition = new google.maps.LatLng(
            parseFloat(this.Stations[i].data.electric_charging_station[index].coordinate.lat),
            parseFloat(this.Stations[i].data.electric_charging_station[index].coordinate.long)
          );

          const marker = new google.maps.Marker({
            position: markerPosition,
            map: this.map,
            icon: this.MarkerOptions.icon
          });

          this.MarkerPositions.push({ position: markerPosition, marker });

          const infoWindow = new google.maps.InfoWindow({
            content: `<div>Charging Station Details: ${markerPosition.lat()}, ${markerPosition.lng()}</div>`
          });

          this.infoWindows.push(infoWindow);

          google.maps.event.addListener(marker, 'click', () => {
            this.closeAllInfoWindows();
            infoWindow.open(this.map, marker);
          });
        }
      }

    } catch (error) {
      console.error('Error fetching lorry parking station data:', error);
    }
  }

  closeAllInfoWindows() {
    for (const infoWindow of this.infoWindows) {
      infoWindow.close();
    }
  }

  center: google.maps.LatLngLiteral = {
    lat: 51.165691,
    lng: 10.451526
  };
  zoom = 8;

  iconUrl = '../../assets/svg/electric.svg';

  MarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: this.iconUrl,
      scaledSize: new google.maps.Size(60, 60)
    },
  };

  MarkerPositions: { position: google.maps.LatLng; marker: google.maps.Marker }[] = [];

  addMarker(event: google.maps.MapMouseEvent, isChargingStation: boolean) {
    // No need for this method if you're using click event listeners on each marker
  }
}

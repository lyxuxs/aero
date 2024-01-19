import { Component } from '@angular/core';
import { functionCharging } from '../data/ChargingStations';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  constructor() { }
  ngOnInit(): void {
    console.log("functionCharging",functionCharging());
  }

  center: google.maps.LatLngLiteral = {
    lat: 51.165691,
    lng: 10.451526
  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  customMarkerIconUrl = '../../assets/svg/charging_pin.svg';

  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: this.customMarkerIconUrl,
    },
    position: this.center,
  };

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  constructor() { }
  
  center: google.maps.LatLngLiteral = {
    lat: 51.165691,
    lng: 10.451526
  };
  
  zoom = 4;
  
  markerPositions: google.maps.LatLngLiteral[] = [];
  markerOptions: google.maps.MarkerOptions[] = []; // Add this line
  
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      const newMarkerPosition = event.latLng.toJSON();
      
      // Create a new marker options object for each marker
      const newMarkerOptions: google.maps.MarkerOptions = {
        position: newMarkerPosition,
        draggable: false,
        icon: '../../assets/icons/icons8-construction-100.png' // Set the icon URL here
      };
      
      this.markerPositions.push(newMarkerPosition);
      this.markerOptions.push(newMarkerOptions);
    }
  }
}

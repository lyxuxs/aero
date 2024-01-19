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
  markerOptions: google.maps.MarkerOptions[] = [];
  infoWindows: google.maps.InfoWindow[] = [];
  
  addMarker(event: google.maps.MapMouseEvent, name: string) {
    if (event.latLng != null) {
      const newMarkerPosition = event.latLng.toJSON();
      
      // Set the desired size for the marker icon
      const iconSize = { width: 40, height: 40 };

      // Create a new marker options object for each marker
      const newMarkerOptions: google.maps.MarkerOptions = {
        position: newMarkerPosition,
        draggable: false,
        icon: {
          url: '../../assets/icons/icons8-construction-100.png',
          scaledSize: new google.maps.Size(iconSize.width, iconSize.height)
        }
      };

      const newInfoWindow = new google.maps.InfoWindow({
        content: `<strong>${name}</strong>`
      });

      const newMarker = new google.maps.Marker(newMarkerOptions);

      newMarker.addListener('click', () => {
        this.infoWindows.forEach(infoWindow => {
          infoWindow.close();
        });
        newInfoWindow.open(newMarkerOptions.map, newMarker);
      });

      this.markerPositions.push(newMarkerPosition);
      this.markerOptions.push(newMarkerOptions);
      this.infoWindows.push(newInfoWindow);
    }
  }
}

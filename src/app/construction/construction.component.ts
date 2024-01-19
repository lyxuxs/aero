import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.css']
})
export class ConstructionComponent implements OnInit {

  constructionlist: any;

  constructor(private httpClient: HttpClient) {
    this.constructionlist = [];
  }

  ngOnInit(): void {
    this.getConstructionlist();
  }

  getConstructionlist() {
    this.httpClient.get('https://verkehr.autobahn.de/o/autobahn/A1/services/roadworks').subscribe(
      (result: any) => {
        this.constructionlist = result;
        console.log('Construction List:', this.constructionlist);
      },
      (error) => {
        console.error('Error fetching construction list:', error);
      }
    );
  }

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

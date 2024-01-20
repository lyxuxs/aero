import { Component } from '@angular/core';
import { functionWebCam } from '../../data/WebCam';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrl: './webcam.component.css'
})
export class WebcamComponent {
  webCamStations: any[] = [];

  ngOnInit(): void {
    this.webCamStation();
  }

 
  async webCamStation() {
    try {
      const result = await functionWebCam();
      this.webCamStations = result.flatMap(data => data);
      console.log("this.result", result);
      this.webCamMarkerPositions = [];

      for (let i = 0; i < this.webCamStations.length; i++) {
        console.log("this.webCamStations[i]", this.webCamStations[i]);

        this.webCamMarkerPositions.push({
          lat: parseFloat(this.webCamStations[i].coordinate.lat),
          lng: parseFloat(this.webCamStations[i].coordinate.long)
        });
      }
    } catch (error) {
      console.error('Error fetching charging station data:', error);
    }
  }

  center: google.maps.LatLngLiteral = {
    lat: 51.165691,
    lng: 10.451526
  };
  zoom = 8;
  
  webCamMarkerIconUrl = '../../assets/svg/webcam.svg';

 webCamMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: this.webCamMarkerIconUrl,
      scaledSize: new google.maps.Size(60,60)
    },
  };

  webCamMarkerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent, isChargingStation: boolean) {
    if (event.latLng != null) {
      const position = event.latLng.toJSON();
      if (isChargingStation) {
      } else {
        this.webCamMarkerPositions.push(position);
      }
    }
  }
}
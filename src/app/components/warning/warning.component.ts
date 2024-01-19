import { Component } from '@angular/core';
import { functionWarning } from '../../data/Warning'; 

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css'
})
export class WarningComponent {
  warningStations: any[] = [];

  ngOnInit(): void {
    this.warningStation();
  }

 
  async warningStation() {
    try {
      const result = await functionWarning();
      this.warningStations = result.flatMap(data => data);
      console.log("this.result", result);
      // Initialize markerPositions as an empty array
      this.warningMarkerPositions = [];

      for (let i = 0; i < this.warningStations.length; i++) {
        console.log("this.warningStations[i]", this.warningStations[i]);

        this.warningMarkerPositions.push({
          lat: parseFloat(this.warningStations[i].coordinate.lat),
          lng: parseFloat(this.warningStations[i].coordinate.long)
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
  warningMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    
  };

  warningMarkerPositions: google.maps.LatLngLiteral[] = [];
  addMarker(event: google.maps.MapMouseEvent, isChargingStation: boolean) {
    if (event.latLng != null) {
      const position = event.latLng.toJSON();
      if (isChargingStation) {
      } else {
        this.warningMarkerPositions.push(position);
      }
    }
  }
}
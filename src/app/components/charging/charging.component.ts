import { Component } from '@angular/core';
import { functionCharging } from '../../data/ChargingStations';
import { functionLorryParking } from '../../data/ParkingStations';

interface ChargingStation {
  extent: string;
  identifier: string;
  routeRecommendation: any[];
  coordinate: { lat: string, long: string };
  footer: any[];
  icon: string;
  isBlocked: string;
  description: string[];
  title: string;
  point: string;
  display_type: string;
  lorryParkingFeatureIcons: any[];
  future: boolean;
  subtitle: string;
  startTimestamp: string;
}

@Component({
  selector: 'app-charging',
  templateUrl: './charging.component.html',
  styleUrl: './charging.component.css'
})
export class ChargingComponent {
  chargingStations: any[] = [];

  ngOnInit(): void {
    this.functionChargingStation();
  }

  async functionChargingStation() {
    try {
      const result = await functionCharging();
      this.chargingStations = result.flatMap(data => data);

      // Initialize markerPositions as an empty array
      this.markerPositions = [];

      for (let i = 0; i < this.chargingStations.length; i++) {
        this.markerPositions.push({
          lat: parseFloat(this.chargingStations[i].coordinate.lat),
          lng: parseFloat(this.chargingStations[i].coordinate.long)
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
  chargingCustomMarkerIconUrl = '../../assets/svg/charging_pin.svg';

  chargingMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: this.chargingCustomMarkerIconUrl,
    },
  };

  lorryParkingMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,

  };

  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent, isChargingStation: boolean) {
    if (event.latLng != null) {
      const position = event.latLng.toJSON();
      if (isChargingStation) {
        this.markerPositions.push(position);
      } else {
      }
    }
  }
}
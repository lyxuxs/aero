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
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrl: './parking.component.css'
})
export class ParkingComponent {
  LorryParkingStations: any[] = [];

  ngOnInit(): void {
    this.lorryParkingStation();
  }

 
  async lorryParkingStation() {
    try {
      const result = await functionLorryParking();
      this.LorryParkingStations = result.flatMap(data => data);

      // Initialize markerPositions as an empty array
      this.lorryParkingMarkerPositions = [];

      for (let i = 0; i < this.LorryParkingStations.length; i++) {
        console.log("this.LorryParkingStations[i]", this.LorryParkingStations[i]);

        this.lorryParkingMarkerPositions.push({
          lat: parseFloat(this.LorryParkingStations[i].coordinate.lat),
          lng: parseFloat(this.LorryParkingStations[i].coordinate.long)
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

  lorryParkingMarkerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent, isChargingStation: boolean) {
    if (event.latLng != null) {
      const position = event.latLng.toJSON();
      if (isChargingStation) {
      } else {
        this.lorryParkingMarkerPositions.push(position);
      }
    }
  }
}
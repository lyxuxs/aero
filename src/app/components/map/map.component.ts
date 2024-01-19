import { Component } from '@angular/core';
import { functionCharging } from '../../data/ChargingStations';

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
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.css']
})
export class MapComponent {
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

    customMarkerIconUrl ='../../assets/svg/charging_pin.svg';

    markerOptions: google.maps.MarkerOptions = {
        draggable: false,
        icon: {
          url: this.customMarkerIconUrl,
        },
    };
    markerPositions: google.maps.LatLngLiteral[] = [];
    addMarker(event: google.maps.MapMouseEvent) {
        if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
    }
}
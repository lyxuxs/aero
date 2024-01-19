// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-traffic',
//   templateUrl: './traffic.component.html',
//   styleUrl: './traffic.component.css'
// })
// export class TrafficComponent {

// }

import { Component } from '@angular/core';
import { functionTraffic } from '../../data/TrafficData';

interface TrafficData {
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
  selector: 'app-traffic',
  templateUrl: './traffic.component.html',
  styleUrls: ['./traffic.component.css']
})
export class TrafficComponent {
  trafficData: any[] = [];

  ngOnInit(): void {
    this.fetchTrafficData();
  }

  async fetchTrafficData() {
    try {
      const result = await functionTraffic();
      this.trafficData = result.flatMap(data => data);

      // Initialize markerPositions as an empty array
      this.markerPositions = [];

      for (let i = 0; i < this.trafficData.length; i++) {
        this.markerPositions.push({
          lat: parseFloat(this.trafficData[i].coordinate.lat),
          lng: parseFloat(this.trafficData[i].coordinate.long)
        });
      }
    } catch (error) {
      console.error('Error fetching traffic data:', error);
    }
  }

  center: google.maps.LatLngLiteral = {
    lat: 51.165691,
    lng: 10.451526
  };
  zoom = 8;
  trafficCustomMarkerIconUrl = '../../assets/svg/traffic_pin.svg';

  trafficMarkerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: this.trafficCustomMarkerIconUrl,
    },
  };

  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      const position = event.latLng.toJSON();
      this.markerPositions.push(position);
    }
  }
}


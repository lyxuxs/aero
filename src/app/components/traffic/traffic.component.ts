import { Component } from '@angular/core';
import { functionTraffic } from '../../data/TrafficData';  

interface TrafficRoad {
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
  trafficRoads: any[] = [];

  ngOnInit(): void {
    this.fetchTrafficRoads();
  }

  async fetchTrafficRoads() {
    try {
      const result = await functionTraffic();  // Adjust this function call based on your actual data source
      this.trafficRoads = result.flatMap(data => data);

      // Initialize markerPositions as an empty array
      this.trafficMarkerPositions = [];

      for (let i = 0; i < this.trafficRoads.length; i++) {
        this.trafficMarkerPositions.push({
          lat: parseFloat(this.trafficRoads[i].coordinate.lat),
          lng: parseFloat(this.trafficRoads[i].coordinate.long)
        });
      }
    } catch (error) {
      console.error('Error fetching traffic road data:', error);
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

  trafficMarkerPositions: google.maps.LatLngLiteral[] = [];

  addTrafficMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) {
      const position = event.latLng.toJSON();
      this.trafficMarkerPositions.push(position);
    }
  }
}


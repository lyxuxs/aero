import { Component } from '@angular/core';
import axios from 'axios';
import { response } from 'express';
import { empty } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  constructor() { }
  ngOnInit(): void {
    this.functionGetAllHeyWays();
  }

  async functionGetAllHeyWays(): Promise<void> {
    try {
      const response = await axios.get('https://verkehr.autobahn.de/o/autobahn/', {
        headers: {
          'accept': 'application/json'
        }
      });
      // console.log("response is:", response.data.roads);
      for (const road of response.data.roads) {
        await this.functionCharging(road);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async functionCharging(roads: any): Promise<void> {
    try {
      const encodedRoads = encodeURIComponent(roads);

      const response = await axios.get(`https://verkehr.autobahn.de/o/autobahn/${encodedRoads}/services/electric_charging_station`, {
        headers: {
          'accept': 'application/json'
        }
      });
      const chargingStationData = response.data.electric_charging_station;

      if (chargingStationData && chargingStationData.coordinate && chargingStationData.coordinate.lat && chargingStationData.coordinate.long) {
        console.log("response is working...");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        console.error(`Charging station data not found for road ${roads}`);
      } else {
        console.error('Error fetching charging station data:', error);
      }
    }
  }



  center: google.maps.LatLngLiteral = {
    lat: 51.165691,
    lng: 10.451526
  };
  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: 51.165691, lng: 10.451526 },
    { lat: 52.520008, lng: 13.404954 },
    { lat: 53.520008, lng: 12.404954 },
    { lat: 54.520008, lng: 14.404954 },
  ];

  customMarkerIconUrl = '../../assets/svg/charging_pin.svg';

  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: this.customMarkerIconUrl,
      // anchor: new google.maps.Point(35,10),
      // scaledSize: new google.maps.Size(100, 100)
    },
    position: this.center,
  };

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
}

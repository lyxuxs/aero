import axios from 'axios';
import { functionGetAllHighways } from './AllHighWays';
import { ApiURL } from '../util/Api';

interface ParkingLorry {
    extent: string;
    identifier: string;
    routeRecommendation: any[]; // Adjust the type as needed
    coordinate: {
      lat: string;
      long: string;
    };
    footer: any[]; // Adjust the type as needed
    icon: string;
    isBlocked: string;
    description: string[];
    title: string;
    point: string;
    display_type: string;
    lorryParkingFeatureIcons: LorryParkingFeatureIcon[];
    future: boolean;
    subtitle: string;
  }
  
  export interface LorryParkingFeatureIcon {
    icon: string;
    description: string;
    style: string;
  }
  
export const functionLorryParking = async (): Promise<ParkingLorry[]> => {
    
    try {
        const heyWaysData = await functionGetAllHighways();

        if (heyWaysData && heyWaysData.roads && heyWaysData.roads.length > 0) {
            const lorryParkingStationDataArray: ParkingLorry[] = [];

            // await Promise.all(heyWaysData.roads.map(async (road: string) => {
            //     const encodedRoad = encodeURIComponent(road);

                const response = await axios.get(`${ApiURL}A1/services/parking_lorry`, {
                    headers: {
                        'accept': 'application/json'
                    }
                });

                const lorryParkingStationData = response.data.parking_lorry as ParkingLorry;
                lorryParkingStationDataArray.push(lorryParkingStationData);
            // }));

            return lorryParkingStationDataArray;
        }
        return [];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.error('Lorry Parking station data not found for one or more roads');
        } else {
            console.error('Error fetching Lorry Parking station data:', error);
        }
        return [];
    }
};
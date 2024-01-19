import axios from 'axios';
import { functionGetAllHighways } from './AllHighWays';
import { ApiURL } from '../util/Api';

interface RoadworksData {
    coordinate: Coordinate;
    roadworks: Roadwork[];
}

interface Roadwork {
    extent: string;
    identifier: string;
    routeRecommendation: any[]; 
    coordinate: {
        lat: string;
        long: string;
    };
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

interface Coordinate {
    lat: string;
    long: string;
}

export const functionCharging = async (): Promise<RoadworksData[]> => {
    try {
        const heyWaysData = await functionGetAllHighways();

        if (heyWaysData && heyWaysData.roads && heyWaysData.roads.length > 0) {
            const chargingStationDataArray: RoadworksData[] = [];

            // await Promise.all(heyWaysData.roads.map(async (road: string) => {
            //     const encodedRoad = encodeURIComponent(road);

                const response = await axios.get(`${ApiURL}A1/services/electric_charging_station`, {
                    headers: {
                        'accept': 'application/json'
                    }
                });

                const chargingStationData = response.data.electric_charging_station as RoadworksData;
                chargingStationDataArray.push(chargingStationData);
            // }));

            return chargingStationDataArray;
        }
        return [];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.error('Charging station data not found for one or more roads');
        } else {
            console.error('Error fetching charging station data:', error);
        }
        return [];
    }
};
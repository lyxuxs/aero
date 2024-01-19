import axios from 'axios';
import { functionGetAllHeyWays } from "./AllHeyWays";

interface RoadworksData {
    roadworks: Roadwork[];
}

interface Roadwork {
    extent: string;
    identifier: string;
    routeRecommendation: any[]; // Adjust the type accordingly
    coordinate: {
        lat: string;
        long: string;
    };
    footer: any[]; // Adjust the type accordingly
    icon: string;
    isBlocked: string; // Assuming this is a string representing a boolean
    description: string[];
    title: string;
    point: string;
    display_type: string;
    lorryParkingFeatureIcons: any[]; // Adjust the type accordingly
    future: boolean;
    subtitle: string;
    startTimestamp: string;
}


export const functionCharging = async (): Promise<RoadworksData[]> => {
    try {
        const heyWaysData = await functionGetAllHeyWays();

        if (heyWaysData && heyWaysData.roads && heyWaysData.roads.length > 0) {
            const chargingStationDataArray: RoadworksData[] = [];

            // Use Promise.all to wait for all requests to complete
            // await Promise.all(heyWaysData.roads.map(async (road: string) => {
            //     const encodedRoad = encodeURIComponent(road);

            const response = await axios.get(`https://verkehr.autobahn.de/o/autobahn/A1/services/electric_charging_station`, {
                headers: {
                    'accept': 'application/json'
                }
            });

            const chargingStationData = response.data.electric_charging_station as RoadworksData;
            chargingStationDataArray.push(chargingStationData);
            // }));

            return chargingStationDataArray;
        }

        // Return an empty array if there are no roads
        return [];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.error('Charging station data not found for one or more roads');
        } else {
            console.error('Error fetching charging station data:', error);
        }

        // Return an empty array in case of an error
        return [];
    }
};

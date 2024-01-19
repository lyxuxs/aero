import axios from 'axios';
import { functionGetAllHighways } from './AllHighWays';
import { ApiURL } from '../util/Api';

interface Warning {
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
    lorryParkingFeatureIcons: LorryParkingFeatureIcon[];
    future: boolean;
    subtitle: string;
    startTimestamp: string;
}

interface LorryParkingFeatureIcon {
    icon: string;
    description: string;
    style: string;
}


export const functionWarning = async (): Promise<Warning[]> => {
    try {
        const heyWaysData = await functionGetAllHighways();

        if (heyWaysData && heyWaysData.roads && heyWaysData.roads.length > 0) {
            const warningStationDataArray: Warning[] = [];

            // await Promise.all(heyWaysData.roads.map(async (road: string) => {
            //     const encodedRoad = encodeURIComponent(road);

            const response = await axios.get(`${ApiURL}A5/services/warning`, {
                headers: {
                    'accept': 'application/json'
                }
            });

            const warningStationData = response.data.warning as Warning;
            warningStationDataArray.push(warningStationData);
            // }));

            return warningStationDataArray;
        }
        return [];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.error('warning station data not found for one or more roads');
        } else {
            console.error('Error fetching warning station data:', error);
        }
        return [];
    }
};
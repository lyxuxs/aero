import axios from 'axios';
import { functionGetAllHighways } from './AllHighWays';
import { ApiURL } from '../util/Api';

interface WebCam {
    extent: string;
    identifier: string;
    routeRecommendation: any[];
    coordinate: {
      lat: string;
      long: string;
    };
    footer: string[];
    icon: string;
    isBlocked: string;
    description: string[];
    title: string;
    operator: string;
    point: string;
    display_type: string;
    lorryParkingFeatureIcons: LorryParkingFeatureIcon[];
    future: boolean;
    imageurl: string;
    subtitle: string;
    linkurl: string;
  }
  
  interface LorryParkingFeatureIcon {
    icon: string;
    description: string;
    style: string;
  }
  
export const functionWebCam = async (): Promise<WebCam[]> => {
    try {
        const heyWaysData = await functionGetAllHighways();

        if (heyWaysData && heyWaysData.roads && heyWaysData.roads.length > 0) {
            const webCamStationDataArray: WebCam[] = [];

            await Promise.all(heyWaysData.roads.map(async (road: string) => {
                const encodedRoad = encodeURIComponent(road);

            const response = await axios.get(`${ApiURL}${encodedRoad}/services/webcam`, {
                headers: {
                    'accept': 'application/json'
                }
            });

            const webCamStationData = response.data.webCam as WebCam;
            webCamStationDataArray.push(webCamStationData);
            }));

            return webCamStationDataArray;
        }
        return [];
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.error('WebCam station data not found for one or more roads');
        } else {
            console.error('Error fetching WebCam station data:', error);
        }
        return [];
    }
};
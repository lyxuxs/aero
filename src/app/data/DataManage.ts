import axios from "axios";
import { ApiURL } from "../util/Api";

export default class DataManage {
    url: string;

    constructor(url: string) {
        this.url = url;
    }

    functionLorryParking = async (): Promise<any[]> => {
        try {
            const dataArray: any[] = [];            
            const response = await axios.get(`${ApiURL}${this.url}`, {
                headers: {
                    'accept': 'application/json'
                }
            });
            const responseData = response as any;
            dataArray.push(responseData);

            return dataArray;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.status === 404) {
                console.error('data not found for one or more roads');
            } else {
                console.error('Error fetching data:', error);
            }
            return [];
        }
    }
}
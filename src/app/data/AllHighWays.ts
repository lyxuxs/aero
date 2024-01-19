import axios from "axios";
import { ApiURL } from "../util/Api";

interface Road {
  roads: string[];
}

export const functionGetAllHighways = async (): Promise<Road | undefined> => {
  try {
    const response = await axios.get(ApiURL, {
      headers: {
        'accept': 'application/json'
      }
    });

    return response.data as Road;
    
  } catch (error) {
    console.error('Error fetching data:', error);
    return undefined;
  }
};

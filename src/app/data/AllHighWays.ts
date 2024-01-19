import axios from "axios";

interface Road {
  roads: string[];
}

export const functionGetAllHighways = async (): Promise<Road | undefined> => {
  try {
    const response = await axios.get('https://verkehr.autobahn.de/o/autobahn/', {
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

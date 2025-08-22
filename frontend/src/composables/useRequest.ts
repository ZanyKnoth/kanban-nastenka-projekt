import axios from 'axios';

export function useRequest() {

    const plainRequest = async(endpoint: string, options = {}): Promise<any> => {
        const response = await axios({
            url: `${endpoint}`,
            ...options,
        });

        return response.data;
    }

    return { plainRequest };
}

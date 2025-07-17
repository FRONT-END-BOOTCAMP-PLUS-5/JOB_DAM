import axios from 'axios';

export const mentorsNum = async () => {
    const response = await axios.get('/api/mentor/count', {
        withCredentials: true
    })

    return response;
}
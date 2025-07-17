import axios from 'axios';

export const questionsNum = async () => {
    const response = await axios.get('/api/question/count', {
        withCredentials: true
    });

    return response;
}
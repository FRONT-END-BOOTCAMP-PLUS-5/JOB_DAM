import axios from 'axios';

export const chatroomsNum = async () => {
    const response = await axios.get('./api/chatroom/count', {
        withCredentials: true
    });

    return response;
}
import axios from 'axios';

export const fetchQuizData = async () => {
    try {
        const response = await axios.get(
            'https://api.allorigins.win/raw?url=https://api.jsonserve.com/Uw5CrX'
        );
        console.log(response.data)
         return response.data;
    } catch (error) {
        console.error('Error fetching quiz data:', error.message);
        return null;
    }
};

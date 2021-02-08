import axios from 'axios';

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'c3eca2d6ad989bd903eb2be8789fb9b2';

export const getWeatherData = async (city) => {
    try {
        let response = await axios.get(`${BASE_URL}?q=${city}&appid=${API_KEY}`);
        return response
    } catch (error) {
        console.error(error);
        throw Error(error);
    }
}
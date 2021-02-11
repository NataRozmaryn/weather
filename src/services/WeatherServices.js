import axios from 'axios';
// /weather
const BASE_URL = 'http://api.openweathermap.org/data/2.5';
const API_KEY = 'c3eca2d6ad989bd903eb2be8789fb9b2';

export const getWeatherData = async (city) => {
    try {
        let response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}`);
        return response
    } catch (error) {
        console.error(error);
        throw Error(error);
    }
}
export const getWeatherDetailData = async (coord_lat, coord_lon) => {
    try {console.log(coord_lat, coord_lon);
        let response = await axios.get(`${BASE_URL}/onecall?lat=${coord_lat}&lon=${coord_lon}&exclude=minutely&appid=${API_KEY}`);
        return response
    } catch (error) {
        console.error(error);
        throw Error(error);
    }
}
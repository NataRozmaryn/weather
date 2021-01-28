import axios from 'axios';

const BASE_URL = 'http://pro.openweathermap.org/data/2.5/forecast';
const API_KEY = 'c3eca2d6ad989bd903eb2be8789fb9b2';


export const getHourlyWeather = (CITY) => {
    return axios.get(`${BASE_URL}/hourly?q=${CITY}&appid=${API_KEY}`)
    .then((res) => {
        console.log("weather", res.data);
        return res.data
    });
};
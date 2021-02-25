import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getForecast } from "../../redux/reducers/forecast_actions";
import currentDate from '../../utils/DataUtils';
import tempToCell from '../../utils/TempUtils';
import moment from "moment";
import { Grid } from "@material-ui/core";
import { getCity } from "../../redux/reducers/cities_actions";


const Forecast = ({ cityName, coord, data, getCityWeather, searchCity }) => {
    const time = currentDate();

    useEffect(() => {
        if (coord) {
            getCityWeather(coord);
        } else {
            searchCity(cityName);
        }
    }, [cityName, coord]);

    if (!data) {
        return (<div className="forecast">
            Loading weather detail
        </div>);
    }
    else {
        console.log("12", data);

        return (
            <div className="forecast">
                {data && data.length ? data.map((item, index) => {
                    let icon = item.weather[0].icon;
                    let url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
                    let date = moment(item.dt * 1000).format("dddd, DD.MM");
                    let sunrise = moment(item.sunrise * 1000).format("HH:mm");
                    let sunset = moment(item.sunset * 1000).format("HH:mm");
                    return (
                        <Grid key={index} container spacing={3} className="forecast_item">
                            <Grid xs={12} item={true}>
                                <h1>{date}</h1>
                            </Grid>
                            <Grid xs={12} sm={4} item={true}>
                                <img src={url} alt={item.weather[0].description} className="forecast_img" />
                                <h2>{item.weather[0].description}</h2>
                            </Grid>
                            <Grid xs={12} sm={8} item={true}>
                                <Grid key={index} container spacing={2} className="forecast_general">
                                    <Grid item={true} xs={2}><p>{tempToCell(item.temp.max)}°</p><p>hight</p></Grid>
                                    <Grid item={true} xs={2}><p>{tempToCell(item.temp.min)}°</p><p>low</p></Grid>
                                    <Grid item={true} xs={2}><p>{item.wind_speed}</p><p>wind</p></Grid>
                                    <Grid item={true} xs={3}><p>{sunrise}</p><p>sunrise</p></Grid>
                                    <Grid item={true} xs={3}><p>{sunset}</p><p>sunset</p></Grid>
                                </Grid>
                            </Grid>

                            <Grid xs={12} item={true}>
                                <Grid key={index} container spacing={2} className="forecast_general">
                                    <Grid item={true} xs={2} ><span>t°C</span></Grid>
                                    <Grid item={true} xs={2} ><span>morn</span><h4>{tempToCell(item.temp.morn)}°</h4></Grid>
                                    <Grid item={true} xs={2} ><span>day</span><h4>{tempToCell(item.temp.day)}°</h4></Grid>
                                    <Grid item={true} xs={2} ><span>eve</span><h4>{tempToCell(item.temp.eve)}°</h4></Grid>
                                    <Grid item={true} xs={2} ><span>night</span><h4>{tempToCell(item.temp.night)}°</h4></Grid>
                                    <Grid item={true} xs={2} ></Grid>
                                    <Grid item={true} xs={2} ><span>feels like</span></Grid>
                                    <Grid item={true} xs={2} ><h4>{tempToCell(item.feels_like.morn)}°</h4></Grid>
                                    <Grid item={true} xs={2} ><h4>{tempToCell(item.feels_like.day)}°</h4></Grid>
                                    <Grid item={true} xs={2}><h4>{tempToCell(item.feels_like.eve)}°</h4></Grid>
                                    <Grid item={true} xs={2} ><h4>{tempToCell(item.feels_like.night)}°</h4></Grid>
                                </Grid>
                            </Grid>
                        </Grid>);
                })
                    : ""}
            </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCityWeather: (city) => getForecast(dispatch, city),
    searchCity: (cityName) => getCity(dispatch, cityName)
});

const mapStateToProps = (state, props) => {
    let cityName = props.city;
    let cityId;
    console.log("forecast.props", props);
    console.log("forecast.cityName", cityName);
    Object.keys(state.cities).forEach(id => {
        if (state.cities[id].name === cityName)
            cityId = id;
    });
    console.log("forecast.cityId: ", cityId)

    const coord = cityId ? state.cities[cityId].coord : null;

    if (coord) {
        coord.cityID = cityId;
    }
    console.log("forecast.coord", coord);


    const forecast = cityId ? state.forecast[cityId] : null;
    const data = forecast?.weatherData;
    return { cityName, coord, data };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Forecast);
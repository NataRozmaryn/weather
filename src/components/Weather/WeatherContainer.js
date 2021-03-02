import React from "react";
import { connect } from "react-redux";
import { getWeather } from "../../redux/reducers/weather_actions";
import Weather from "./Weather";
import { LoaderHOC } from "./LoaderComponentHOC";

const WeatherContainer = ({ city, getCityWeather, timezone, temp, icon, description, windSpeed }) => {

    return <Weather {...{ city, getCityWeather, timezone, temp, icon, description, windSpeed }} />;
};

const EnhancedWeatherContainerWithLoader = LoaderHOC(WeatherContainer);
EnhancedWeatherContainerWithLoader.displayName = "EnhancedWeatherContainerWithLoader";

const mapDispatchToProps = (dispatch) => ({
    getCityWeather: (city) => getWeather(dispatch, city)
});

const mapStateToProps = (state, props) => {
    const cityWeather = state.weather[props.city.id];

    const weatherDetail = props.city.id ? state.weatherDetail[props.city.id] : null;
    const data = weatherDetail?.weatherData ? weatherDetail.weatherData : null;

    const { isLoading, timezone, temp, icon, description, windSpeed } = cityWeather;
    return { isLoading, timezone, temp, icon, description, windSpeed, data };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EnhancedWeatherContainerWithLoader);
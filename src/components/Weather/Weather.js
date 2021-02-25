import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { getWeather } from "../../redux/reducers/weather_actions";
import moment from 'moment';
import refrashIcon from "../../icons/refresh.svg";
import { Link } from "react-router-dom";
import DetailWeatherContainer from "../DetailWeather/DetailWeatherContainer";

const Weather = ({ city, getCityWeather, isLoading = false, timezone, temp, icon, description, windSpeed, data }) => {
    const currentDate = () => {
        return moment().utc().add(timezone, 'seconds').format('dddd HH:mm')
    }

    function handleRefresh() {
        getCityWeather(city);
    }

    // useEffect(() => {
    //   getCityWeather(city);
    //   let interval = setInterval(handleRefresh, 60000)
    //   return () => { clearInterval(interval) };
    // }, [city.id]);

    return (
        <div className="weather">
            <div className="weather__header">
                <h2 className="weather__city">
                    <Link to={{ pathname: `/cityforecast/${city.name}`, state: { city } }}>{city ? `${city.name}` : ''} </Link>
                </h2><img onClick={handleRefresh} className="weather__refresh" src={refrashIcon} alt="refresh" /></div>
            <h3 className="weather__time">
                {currentDate()}
            </h3>
            <h3 className="weather__temperature">
                {icon && <img alt="" src={"http://openweathermap.org/img/wn/" + icon + "@2x.png"} />}
                {Math.round(temp - 273.15)}
                <span className="metric">°C</span>
            </h3>
            <article className="weather__weather">
                <h4 className="weather__weather__title">
                    <span className="weather__weather__label">
                        Current conditions:
                    </span>
                    <strong className="current__weather__conditions">
                        {description}
                    </strong>
                </h4>
            </article>
            <p
                className={cx(
                    "city-item__text",
                    city && city.enabled && "city-item__text--selected"
                )}
            >
                {city.content}
            </p>
            <p> wind: <strong>{windSpeed} <span>m/s</span></strong></p>
            <DetailWeatherContainer city={city.name} />
            <Link to={{ pathname: `/city/${city.name}`, state: { city } }}> show more </Link>
            {(isLoading) && <div className="weather-item">
                Loading...
            </div>}
        </div>
    )
};

const mapDispatchToProps = (dispatch) => ({
    getCityWeather: (city) => getWeather(dispatch, city)
});

const mapStateToProps = (state, props) => {
    const cityWeather = state.weather[props.city.id];
    if (!cityWeather) {
        return { isLoading: true }
    }

    const weatherDetail = props.city.id ? state.weatherDetail[props.city.id] : null;
    const data = weatherDetail?.weatherData ? weatherDetail.weatherData : null;

    const { isLoading, timezone, temp, icon, description, windSpeed } = cityWeather.weatherData;
    return { isLoading, timezone, temp, icon, description, windSpeed, data };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Weather);
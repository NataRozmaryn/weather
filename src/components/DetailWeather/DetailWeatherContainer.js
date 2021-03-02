import React, { useEffect } from "react";
import { connect } from "react-redux";
import DetailWeather from "./DetailWeather";
import { getDetailWeather } from "../../redux/reducers/weatherDetail_actions";
import { getCity } from "../../redux/reducers/cities_actions";

const DetailWeatherContainer = ({ cityName, coord, data, searchCity, getDetailWeather, short }) => {
    useEffect(() => {
        if (coord) {
            console.log("weatherContainer.weatherRequested");
            getDetailWeather(coord);
        } else {
            console.log("weatherContainer.cityInfoRequested");
            searchCity(cityName);
        }
    }, [cityName, coord]);

    if (!data) {
        return (<div className="detailWeather">
            Loading weather detail
        </div>);
    } else {
        return <DetailWeather data={data} short={short} />

    }
};

const mapDispatchToProps = (dispatch) => ({
    getDetailWeather: (city) => getDetailWeather(dispatch, city),
    searchCity: (cityName) => getCity(dispatch, cityName)
});

const mapStateToProps = (state, props) => {
    let cityName = props.city;
    let cityId;
    console.log("weatherContainer.cityName", cityName);
    Object.keys(state.cities).forEach(id => {
        if (state.cities[id].name === cityName)
            cityId = id;
    });
    console.log("weatherContainer.cityId: ", cityId)

    const coord = cityId ? state.cities[cityId].coord : null;

    if (coord) {
        coord.cityID = cityId;
    }

    const weatherDetail = cityId ? state.weatherDetail[cityId] : null;
    const data = weatherDetail && weatherDetail.weatherData ? weatherDetail.weatherData : null;
    console.log("weatherContainer.coord", coord);
    return { cityName, coord, data };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailWeatherContainer);
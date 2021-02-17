import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDetailWeather } from "../../redux/reducers/weatherDetail_actions";
import currentDate from '../../utils/DataUtils';
import tempToCell from '../../utils/TempUtils';
import Weather from '../Weather/Weather';
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import GridList from '@material-ui/core/GridList';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from '@material-ui/core/styles';
import DataManager from "../DataManager/DataManager";



const DetailWeather = ({ cityName, coord, data, getCityWeather, short}) => {
    const time = currentDate();

    useEffect(() => {
        if (coord) { //debugger;
            getCityWeather(coord);
        }
    }, [cityName, coord]);

    if (!data) {
        return (<div className="weather">
            <DataManager city={cityName}/>
            Loading weather detail
        </div>);
    }
    else {
        console.log("12", data);
        return (<div className="root">
            <GridList className="gridList" cols={2.5}>
                {data && data.length ? data.filter((item, i) => !short || i <= 10)
                .map((item, i) => {
                    let date = moment(item.dt * 1000).format("DD.MM HH:mm");
                    let url = "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png";
                    return (
                        <Grid item key={i} xs={3} sm={2} md={2} id="gridList_root">
                            <Card className="gridList_item" id="gridList_item">
                                <p >
                                    {date}
                                </p>
                                <CardMedia
                                    className="gridList_img"
                                    image={url}
                                    title="Image title"
                                />
                                <div className="gridList_content" id="gridList_content">
                                    <p>
                                        {item.weather[0].main}
                                    </p>
                                    <p>
                                        {tempToCell(item.temp)}°
                                    </p>
                                    <p>
                                        feels: {tempToCell(item.feels_like)} °
                                    </p>
                                </div>
                            </Card>
                        </Grid >
                    )
                }
                ) : ""}
            </GridList>
        </div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    getCityWeather: (city) => getDetailWeather(dispatch, city)
});

const mapStateToProps = (state, props) => {
    //debugger;
    // let city = props.location?.state?.city;
    let cityName = props.city;
    // const cityWeather = city && state.weather[city.id];
    //const city=props.location?.state?.city
    //if (!location?.state.weather[city]){getWeather(dispatch, city)} 
    let cityId;
    Object.keys(state.cities).forEach(id => {
        debugger;
        if (state.cities[id].name === cityName)
            cityId = id;
    });
    console.log("mapStateToProps.cityId: ", cityId)
    // const cityWeather = cityId ? state.weather[cityId] : null;
    // const coord = cityWeather && cityWeather.weatherData ? cityWeather.weatherData.coord : null;
    const coord = cityId ? state.cities[cityId].coord : null;
    if (coord) {
        // coord.cityID = city.id;
        coord.cityID = cityId;
    }
        
    // const weatherDetail = state.weatherDetail[city.id];
    const weatherDetail = cityId ? state.weatherDetail[cityId] : null;
    // const dataD = weatherDetail && weatherDetail.weatherData ? weatherDetail.weatherDatanull : null;
    const data = weatherDetail && weatherDetail.weatherData ? weatherDetail.weatherData : null;
    console.log("coord", coord);
    return { cityName, coord, data };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailWeather);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    // title: {
    //     color: theme.palette.primary.light,
    // },
    // titleBar: {
    //     background:
    //         'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    // },
}));



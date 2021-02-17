import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDetailWeather } from "../../redux/reducers/weatherDetail_actions";
import currentDate from '../../utils/DataUtils';
import tempToCell from '../../utils/TempUtils';
import Weather from '../Weather/Weather';
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';


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
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

const DetailWeather = ({ coord, data, getCityWeather, location, match, dataD }) => {
    const time = currentDate();

    useEffect(() => {
        console.log("1", dataD);
        if (coord) { //debugger;
            getCityWeather(coord);
        }
    }, [coord]);

    if (!data) {
        return (<div className="weather">
            Loading weather detail
        </div>);
    }
    else {
        console.log("12", data);
        return (<div className="root">
            <GridList className="gridList" cols={2.5}>
                {data && data.length ? data.map((item, i) => {
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
    let city = props.location?.state?.city;
    // const cityWeather = props.city && state.weather_reducer[props.city.id];
    const cityWeather = city && state.weather[city.id];
    const coord = cityWeather && cityWeather.weatherData ? cityWeather.weatherData.coord : null;
    if (coord) {
        coord.cityID = city.id;
    }
        
    const weatherDetail = state.weatherDetail[city.id];
    const dataD = weatherDetail && weatherDetail.weatherData ? weatherDetail.weatherDatanull : null;
    const data = weatherDetail && weatherDetail.weatherData ? weatherDetail.weatherData : null;
    console.log("coord", coord);
    return { coord, data, dataD };
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DetailWeather);


import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getDetailWeather } from "../../redux/reducers/weatherDetail_actions";
import currentDate from '../../utils/DataUtils';
import tempToCell from '../../utils/TempUtils';

const DetailWeather = ({ coord, data, getCityWeather}) => {
  const time = currentDate();
  
  useEffect(() => {
      if(coord) { debugger;
        getCityWeather(coord);
      }
  }, [coord]);

  if (!data)
    return (<div className="weather">
      Loading weather detail
      </div>);

  return (
      <div className="weather">
      weather detail {data[0].humidity}
      </div>  
  )
};

const mapDispatchToProps = (dispatch) => ({
  getCityWeather: (city) => getDetailWeather(dispatch, city)
});

const mapStateToProps = (state, props) => {
    debugger;
    const cityWeather = props.city && state.weather_reducer[props.city.id];
    const  coord = cityWeather && cityWeather.weatherData ? cityWeather.weatherData.coord : null;
    if (coord)
        coord.cityID = props.city.id;

    const weatherDetail = state.weatherDetail_reducer[props.city.id];
    const data = weatherDetail && weatherDetail.weatherData ? weatherDetail.weatherData.daily : null;

    console.log("coord",coord);
    return  { coord, data };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailWeather);
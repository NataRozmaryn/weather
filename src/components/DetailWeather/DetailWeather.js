import React from "react";
import tempToCell from '../../utils/TempUtils';
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import GridList from '@material-ui/core/GridList';
import CardMedia from '@material-ui/core/CardMedia';


const DetailWeather = ({ data, short }) =>
    (<div className="root detailWeather">
        <GridList className="gridList" cols={2.5}>
            {data && data.length ? data.filter((item, i) => !short || i <= 10)
                .map((item, i) => {
                    let date = moment(item.dt * 1000).format("DD.MM HH:mm");
                    let url = `http://openweathermap.org/img/w/${item.icon}.png`;
                    return (
                        <Grid item key={i} xs={3} sm={2} md={2} id="gridList_root">
                            <Card className="gridList_item" id="gridList_item">
                                <p>
                                    {date}
                                </p>
                                <CardMedia
                                    className="gridList_img"
                                    image={url}
                                    title="Image title"
                                />
                                <div className="gridList_content" id="gridList_content">
                                    <p>
                                        {item.main}
                                    </p>
                                    <p>
                                        {tempToCell(item.temp)}°
                                            </p>
                                    <p>
                                        feels: {tempToCell(item.feels_like)} °
                                            </p>
                                </div>
                            </Card>
                        </Grid>
                    )
                }
                ) : ""}
        </GridList>
    </div>
    );

export default DetailWeather;



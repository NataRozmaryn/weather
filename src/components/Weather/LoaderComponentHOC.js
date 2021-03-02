import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

export const LoaderHOC = (Component) => {
    const Loader = ({ isLoading, ...restProps }) => {

        return (
            <div className="weather-item">
                <Component {...restProps} />
                {(isLoading) && <div className="weather-loader">
                    <CircularProgress disableShrink color="white" />
                </div>}
            </div>
        )
    };
    Loader.displayName = "LoaderComponentHOC"
    return Loader;
};

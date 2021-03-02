import React from "react";
import CircularProgress from '@material-ui/core/CircularProgress';

export const LoaderComponent = ({ isLoading, children }) => {
    return (
        <div>
            {children}
            {(isLoading) && <div className="weather-loader">
                <CircularProgress disableShrink color="white" />
            </div>}
        </div>
    )
};

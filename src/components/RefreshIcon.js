import React from "react";
import refrashIcon from "../icons/refresh.svg";

const RefreshIcon = ({onClick}) => {
    return (
        <div className="weather__refresh">
            <img className="weather__refresh__img" src={refrashIcon} alt="refresh" onClick={onClick}/>
        </div>
    );
}
export default RefreshIcon;
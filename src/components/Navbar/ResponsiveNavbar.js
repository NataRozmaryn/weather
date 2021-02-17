

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import CityList from '../CityList/CityList';
import AddCity from "../AddCity/AddCity";


export default function SearchAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <ToggleButtonGroup value={"formats"} className="toggleCity">
            <CityList />
          </ToggleButtonGroup>
          <AddCity />
        </Toolbar>
      </AppBar>
    </div>
  );
}
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));
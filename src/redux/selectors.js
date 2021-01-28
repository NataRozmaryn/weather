import { VISIBILITY_FILTERS } from "../constants";

export const getCitiesState = store => store.cities;

export const getCityList = store =>
  getCitiesState(store) ? getCitiesState(store).allIds : [];

export const getCityById = (store, id) =>
  getCitiesState(store) ? { ...getCitiesState(store).byIds[id], id } : {};

export const getCities = store =>
  getCityList(store).map(id => getCityById(store, id));

export const getCitiesByVisibilityFilter = (store, visibilityFilter) => {
  const allCities = getCities(store);
  switch (visibilityFilter) {
    case VISIBILITY_FILTERS.SELECTED:
      return allCities.filter(city => city.selected);
    case VISIBILITY_FILTERS.UNSELECTED:
      return allCities.filter(city => !city.selected);
    case VISIBILITY_FILTERS.ALL:
    default:
      return allCities;
  }
};
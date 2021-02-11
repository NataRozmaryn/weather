import moment from 'moment';

const currentDate = (timezone) => {
    return moment().utc().add(timezone, 'seconds').format('dddd HH:mm')
  };
export default currentDate
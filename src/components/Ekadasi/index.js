import React from 'react';
import PropTypes from 'prop-types';
import {
  addDays,
  isAfter,
  closestTo,
  subDays,
  isBefore,
  subMinutes,
  differenceInMilliseconds,
  addMilliseconds,
} from 'date-fns';
import SunCalc from 'suncalc2';
import MoonPhase from '../Moon';

const getSunrise = ({ date, geo }) =>
  SunCalc.getTimes(date, geo.latitude, geo.longitude).sunrise;

const ekadasi = ({ date, geo, tithi }) => {
  const eleventh = addMilliseconds(date, tithi * 10);
  const sunrise = getSunrise({ date: eleventh, geo });
  const sunriseOffset = subMinutes(sunrise, 96);
  if (isBefore(eleventh, sunriseOffset)) {
    return sunrise;
  }
  const next = addMilliseconds(eleventh, tithi);
  const nextSunrise = getSunrise({ date: next, geo });
  return nextSunrise;
};

const getNextEkadasi = ({ ekadasis, date }) => {
  const futureEkadasis = ekadasis.filter(ekadasi => isAfter(ekadasi, date));
  const nextEkadasi = closestTo(date, futureEkadasis);
  return nextEkadasi;
};

const Ekadasi = ({ date, geo, children }) => {
  return (
    <MoonPhase date={date}>
      {({ lune, range, hunt }) => {
        const { new_date, nextnew_date } = hunt;
        const tithi = differenceInMilliseconds(nextnew_date, new_date) / 30;
        const newMoons = range(
          subDays(date, 28),
          addDays(date, 28),
          lune.PHASE_NEW
        );
        const fullMoons = range(
          subDays(date, 56),
          addDays(date, 56),
          lune.PHASE_FULL
        );
        const ekadasis = [...newMoons, ...fullMoons].map(date =>
          ekadasi({ date, geo, tithi })
        );
        const nextEkadasi = getNextEkadasi({ ekadasis, date });
        return children({ ekadasis, nextEkadasi });
      }}
    </MoonPhase>
  );
};

Ekadasi.propTypes = {
  date: PropTypes.object,
  children: PropTypes.node,
  geo: PropTypes.object.isRequired,
};

Ekadasi.defaultProps = {
  date: new Date(),
  children: () => null,
  geo: {
    latitude: 0,
    longitude: 0,
  },
};

export default Ekadasi;

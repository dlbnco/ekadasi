import React from 'react';
import PropTypes from 'prop-types';
import {
  addDays,
  isAfter,
  closestTo,
  subDays,
  isBefore,
  subMinutes,
} from 'date-fns';
import SunCalc from 'suncalc2';
import MoonPhase from '../Moon';

const ekadasi = ({ date, geo }) => {
  const tenth = addDays(date, 10);
  const eleventh = addDays(date, 11);
  const { sunrise } = SunCalc.getTimes(eleventh, geo.latitude, geo.longitude);
  if (isBefore(tenth, subMinutes(sunrise, 96))) {
    return tenth;
  }
  return eleventh;
};

const getNextEkadasi = ({ ekadasis, date }) => {
  const futureEkadasis = ekadasis.filter(ekadasi => isAfter(ekadasi, date));
  const nextEkadasi = closestTo(date, futureEkadasis);
  return nextEkadasi;
};

const Ekadasi = ({ date, geo, children }) => {
  return (
    <MoonPhase date={date}>
      {({ lune, range }) => {
        const newMoons = range(
          subDays(date, 28),
          addDays(date, 28),
          lune.PHASE_NEW
        );
        const fullMoons = range(
          subDays(date, 28),
          addDays(date, 28),
          lune.PHASE_FULL
        );
        const ekadasis = [...newMoons, ...fullMoons].map(date =>
          ekadasi({ date, geo })
        );
        const nextEkadasi = getNextEkadasi({ ekadasis, date });
        return children({ nextEkadasi });
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

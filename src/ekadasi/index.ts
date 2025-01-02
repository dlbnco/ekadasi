import { addDays, closestTo, isAfter, isEqual, subDays } from 'date-fns';
import { getMoonIllumination, getSunTimes, IDateObj } from 'suncalc3';

// Interval between full/new moon phase divided by 15.
const TITHI_DURATION_MS = 85048092.6;

/*
 * Given a start and end date,
 * return either NEW or FULL moons in that range.
 */
export const getSignificantPhases = (
  start: Date,
  end: Date,
): Array<IDateObj> => {
  const significantPhases: Array<IDateObj> = [];

  while (true) {
    const illumination = getMoonIllumination(
      significantPhases.length > 0
        ? significantPhases.slice(-1)[0].value + 1
        : start,
    );

    const nextSignificantPhase = [
      illumination.next.fullMoon,
      illumination.next.newMoon,
    ].sort((a, b) => a.value - b.value)[0];

    if (isAfter(nextSignificantPhase.value, end)) {
      return significantPhases;
    } else {
      significantPhases.push(nextSignificantPhase);
    }
  }
};

type Ekadasi = [Date, Date];

/*
 * Given a start and end date,
 * return a ekadasi list, each item
 * consisting of datetimes for the start and end.
 */
export const getEkadasiListWithinDateRange = (
  start: Date,
  end: Date,
): Array<Ekadasi> => {
  const significantPhases = getSignificantPhases(start, end);

  return significantPhases.map((p, idx, arr) => {
    return [
      new Date(p.value - TITHI_DURATION_MS * 5), // the eleventh out of 15
      new Date(p.value - TITHI_DURATION_MS * 4),
    ];
  });
};

/*
 * Given a Ekadasi,
 * return the datetime of sunset of the day before. (last meal)
 */
export const getSunsetBeforeEkadasi = (
  ekadasi: Ekadasi,
  geo: [number, number],
) => {
  return getSunTimes(subDays(ekadasi[0], 1), geo[0], geo[1]).sunsetEnd.value;
};

/*
 * Given a Ekadasi,
 * return the datetime of sunrise of the day after. (break fast)
 */
export const getSunriseAfterEkadasi = (
  ekadasi: Ekadasi,
  geo: [number, number],
) => {
  return getSunTimes(addDays(ekadasi[0], 1), geo[0], geo[1]).sunriseStart.value;
};

/*
 * Given a date, and a list of Ekadasi,
 * return the first Ekadasi after that date.
 */
export const getNextEkadasi = (date: Date, ekadasiList: Array<Ekadasi>) => {
  if (isAfter(date, ekadasiList.slice(-1)[0][0])) {
    throw new Error('Given date is after the last item in the list.');
  }
  const closestStart = closestTo(
    date,
    ekadasiList.filter((e) => isAfter(e[0], date)).map((e) => e[0]),
  );

  if (closestStart == null) {
    throw new Error('Could not find the closest Ekadasi');
  }

  return ekadasiList.find((e) => isEqual(closestStart, e[0]));
};

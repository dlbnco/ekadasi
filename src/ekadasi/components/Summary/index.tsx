'use client';
import {
  getEkadasiListWithinDateRange,
  getNextEkadasi,
  getSunriseAfterEkadasi,
  getSunsetBeforeEkadasi,
} from '@/ekadasi';
import { GeoContext } from '@/geo';
import { endOfYear, format, formatDistance, subDays } from 'date-fns';
import React, { useContext } from 'react';

interface Props {
  date: Date;
  className?: string;
}

const EkadasiSummary: React.FC<Props> = ({ date, className }) => {
  const geoContext = useContext(GeoContext);
  const list = getEkadasiListWithinDateRange(
    subDays(date, 28),
    endOfYear(date),
  );
  const next = getNextEkadasi(date, list);
  if (next == null) return null;
  const sunset = getSunsetBeforeEkadasi(next, [
    geoContext.latitude,
    geoContext.longitude,
  ]);
  const sunrise = getSunriseAfterEkadasi(next, [
    geoContext.latitude,
    geoContext.longitude,
  ]);
  return (
    <div className={className}>
      <div className="border inline-block mx-auto p-6 px-10 font-mono">
        <div className="font-mono text-xl">
          {format(next[0], 'eeee, dd MMM')}
        </div>
        <div className="text-slate-400 mb-4">
          (in {formatDistance(next[0], new Date())})
        </div>
        <div className="text-slate-400 text-sm">last meal before</div>
        {format(sunset, 'eeee, dd MMM HH:mm:ss')} (sunset)
        <div className="text-slate-400 text-sm mt-4">first meal after</div>
        {format(sunrise, 'eeee, dd MMM HH:mm:ss')} (sunrise)
      </div>
      {geoContext.didAllow === false ? (
        <>
          <div
            onClick={geoContext.request}
            className="mt-4 text-orange-500 text-sm cursor-pointer"
          >
            Enable location to get your local Sun hours
          </div>
          <span className="text-slate-400 text-xs">
            Location data is not shared with anyone and only processed in your
            device
          </span>
        </>
      ) : null}
    </div>
  );
};

export default EkadasiSummary;

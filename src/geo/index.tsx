'use client';
import React, { useState, useEffect, PropsWithChildren } from 'react';

const initialGeo = {
  latitude: 0,
  longitude: 0,
  didAllow: undefined,
};

interface Geo {
  latitude: number;
  longitude: number;
  didAllow: boolean | undefined;
}

export const GeoContext = React.createContext<
  Geo & {
    request: () => void;
  }
>({ ...initialGeo, request: () => {} });

export const GeoProvider: React.FC<PropsWithChildren> = (props) => {
  const [geo, setGeo] = useState<Geo>(initialGeo);

  const request = () => {
    if (typeof navigator !== 'undefined') {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setGeo(() => ({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              didAllow: true,
            }));
          },
          () => {
            setGeo((s) => ({ ...s, didAllow: false }));
          },
        );
      }
    }
  };

  useEffect(() => {
    request();
  }, []);
  return <GeoContext.Provider value={{ ...geo, request }} {...props} />;
};

export default GeoProvider;

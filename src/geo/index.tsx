'use client';
import React, { useState, useEffect, PropsWithChildren } from 'react';

const initialGeo = {
  latitude: 0,
  longitude: 0,
};

export const GeoContext = React.createContext(initialGeo);

export const GeoProvider: React.FC<PropsWithChildren> = (props) => {
  const [geo, setGeo] = useState(initialGeo);
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) =>
          setGeo({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        );
      }
    }
  }, []);
  return <GeoContext.Provider value={geo} {...props} />;
};

export default GeoProvider;

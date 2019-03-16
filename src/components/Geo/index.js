import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const GeoContext = React.createContext({
  latitude: 0,
  longitude: 0,
});

let initialGeo = {
  latitude: 0,
  longitude: 0,
};

export const GeoProvider = props => {
  const [geo, setGeo] = useState(initialGeo);
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position =>
          setGeo({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
        );
      }
    }
  }, []);
  return <GeoContext.Provider value={geo} {...props} />;
};

const Geo = ({ children }) => {
  return <GeoContext.Consumer>{geo => children({ geo })}</GeoContext.Consumer>;
};

Geo.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Geo;

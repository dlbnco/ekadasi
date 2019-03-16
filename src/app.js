import React from 'react';
import { GeoProvider } from './components/Geo';

/* eslint-disable react/prop-types */
const app = ({ element }) => {
  return <GeoProvider>{element}</GeoProvider>;
};

export default app;

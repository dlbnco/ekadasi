import lune from 'lune';

const MoonPhase = ({ date, children }) => {
  const moon = lune.phase(date);
  const hunt = lune.phase_hunt(date);
  const range = lune.phase_range;
  return children({ lune, moon, hunt, range });
};

export default MoonPhase;

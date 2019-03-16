import lune from 'lune';

const MoonPhase = ({ date, children }) => {
  const moon = _date => lune.phase(_date || date);
  const hunt = _date => lune.phase_hunt(_date || date);
  const range = lune.phase_range;
  return children({ lune, moon, hunt, range });
};

MoonPhase.propTypes = {
  date: new Date(),
};

export default MoonPhase;

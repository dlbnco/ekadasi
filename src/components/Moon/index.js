import lune from "lune"

const MoonPhase = ({ date, children }) => {
  const moon = _date => lune.phase(_date || date)
  const hunt = _date => lune.phase_hunt(_date || date)
  const range = _date => lune.phase_range(_date || date)
  return children({ moon, hunt, range })
}

MoonPhase.propTypes = {
  date: new Date(),
}

export default MoonPhase

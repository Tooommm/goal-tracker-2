import LinearProgress from '@material-ui/core/LinearProgress'

import { nonNegativeInteger, positiveInteger } from '../shared/prop-types'

const Gauge = ({ max, value }) => {
  return (
    <LinearProgress
      style={{ height: 8 }}
      variant='determinate'
      value={normalize(value, max)}
    />
  )
}

Gauge.defaultProps = {
  max: 100,
}

Gauge.propTypes = {
  max: positiveInteger,
  value: nonNegativeInteger.isRequired,
}

function normalize(value, max) {
  return value * (100 / max)
}

export default Gauge

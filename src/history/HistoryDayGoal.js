import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import Gauge from '../shared/Gauge'
import {
  GoalPropType,
  HistoryDayProgressesPropType,
} from '../shared/prop-types'

const HistoryDayGoal = ({
  goal: { name, units },
  stats: [progress = 0, target] = [],
}) => {
  const details = (
    <div>
      <Gauge value={progress} max={target} />
      {progress} {units} sur {target}
    </div>
  )

  return (
    <ListItem>
      <ListItemText
        component='div'
        primary={name}
        secondary={details}
        secondaryTypographyProps={{ component: 'div' }}
      />
    </ListItem>
  )
}

HistoryDayGoal.propTypes = {
  goal: GoalPropType.isRequired,
  stats: HistoryDayProgressesPropType.isRequired,
}

export default HistoryDayGoal

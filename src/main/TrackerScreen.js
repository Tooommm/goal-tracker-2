// Écran de suivi des objectifs
// ============================

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import HistoryIcon from '@material-ui/icons/History'
import SettingsIcon from '@material-ui/icons/Settings'

import { formatDate, getDayCounts } from '../lib/helpers'
import Gauge from '../shared/Gauge'
import GoalTrackerWidget from './GoalTrackerWidget'
import { progressOnGoal } from '../reducers/todaysProgress'

import './TrackerScreen.css'

const TrackerScreen = () => {
  useEffect(() => {
    document.title = 'Mes objectifs du jour'
  }, [])

  const { goals, today, todaysProgress } = useSelector(selectState)

  const dispatch = useDispatch()

  return (
    <Card className='goalTracker'>
      <CardHeader
        subheader={<Gauge {...overallProgress()} />}
        title={formatDate(today, 'medium')}
      />
      <CardContent>
        {goals.map((goal) => (
          <GoalTrackerWidget
            goal={goal}
            key={goal.id}
            onProgress={markGoalProgression}
            progress={todaysProgress[goal.id] || 0}
          />
        ))}
      </CardContent>
      <CardActions>
        <Button
          color='secondary'
          component={Link}
          to='/history'
          variant='contained'
        >
          <HistoryIcon /> Historique
        </Button>
        <Button component={Link} to='/settings' variant='contained'>
          <SettingsIcon /> Paramètres
        </Button>
      </CardActions>
    </Card>
  )

  function markGoalProgression({ id }) {
    dispatch(progressOnGoal(id))
  }

  function overallProgress() {
    const { totalProgress, totalTarget } = getDayCounts(todaysProgress, goals)

    return { value: totalProgress, max: totalTarget }
  }
}

const selectState = ({ goals, today, todaysProgress }) => ({
  goals,
  today,
  todaysProgress,
})

export default TrackerScreen

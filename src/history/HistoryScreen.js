// Historique (conteneur)
// ======================

import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import ArrowBack from '@material-ui/icons/ArrowBack'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import ClearIcon from '@material-ui/icons/Clear'
import Typography from '@material-ui/core/Typography'

import { clearHistory } from '../reducers/history'
import HistoryDay from './HistoryDay'

export const HistoryScreen = () => {
  useEffect(() => {
    document.title = 'Mon historique'
  }, [])

  const { goals, history } = useSelector(selectState)

  const dispatch = useDispatch()

  return (
    <>
      <Button component={Link} to='/' variant='text'>
        <ArrowBack />
        Retour
      </Button>
      <Card className='history'>
        <CardHeader title='Historique' />
        <CardContent>
          {history.map((dayStats) => (
            <HistoryDay goals={goals} key={dayStats.date} stats={dayStats} />
          ))}
          {history.length === 0 && (
            <Typography>Aucun historique disponible</Typography>
          )}
        </CardContent>
        {history.length > 0 && (
          <CardActions>
            <Button
              variant='contained'
              onClick={() => dispatch(clearHistory())}
            >
              <ClearIcon />
              Réinitialiser
            </Button>
          </CardActions>
        )}
      </Card>
    </>
  )
}

// Fonction de sélection des valeurs utiles au composant au sein de l’état
// global applicatif géré par Redux.  L’argument est l’état global applicatif
// dans son intégralité, la valeur de retour sera celle renvoyée par le
// [`useSelector()`](https://react-redux.js.org/api/hooks#useselector) auquel on
// aura passé cette fonction.
//
// Ici, on renvoie un sous-ensemble de l’état global, sans altérer les valeurs
// des propriétés retenues (comme un
// [`_.pick()`](https://lodash.com/docs/#pick)), donc on renvoie un littéral
// objet avec ces propriétés-là.  Attention à la syntaxe : à gauche de la
// flèche, on a la signature de la fonction, qui déstructure son argument objet
// pour y prendre deux propriétés ; à droite de la flèche, on a un littéral
// objet, qu’on a dû enrober par des parenthèses pour que les accolades, étant
// ainsi forcées d’être une expression et non un bloc de fonction, représentent
// bien un littéral objet.
const selectState = ({ goals, history }) => ({ goals, history })

export default HistoryScreen

import { useState } from 'react'

import Add from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Edit from '@material-ui/icons/Create'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import TextField from '@material-ui/core/TextField'

import {
  bool,
  func,
  GoalPropType,
  oneOfType,
  shape,
} from '../shared/prop-types'

const DEFAULT_STATE = {
  id: undefined,
  name: '',
  target: 5,
  units: '',
  keepOpen: true,
}

const AddSettingDialog = ({ goal, onAdd, onCancel, open }) => {
  const [state, setState] = useState(DEFAULT_STATE)

  const [prevGoalId, setPrevGoalId] = useState(undefined)
  if (prevGoalId !== goal.id) {
    setState({ ...DEFAULT_STATE, ...goal, keepOpen: goal.id === undefined })
    setPrevGoalId(goal.id)
  }

  const isEditing = 'id' in goal

  return (
    <Dialog aria-labelledby='addGoalTitle' onClose={onCancel} open={open}>
      <DialogTitle id='addGoalTitle'>
        {isEditing ? 'Modifier un objectif' : 'Ajouter un objectif'}
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label='Nom'
          margin='normal'
          name='name'
          onChange={(event) => handleChange(event, 'name')}
          required
          value={state.name}
        />
        <TextField
          label='Quantité par jour'
          margin='normal'
          name='target'
          onChange={(event) => handleChange(event, 'target')}
          required
          type='number'
          value={state.target}
        />{' '}
        <TextField
          label='Unité'
          margin='normal'
          name='units'
          onChange={(event) => handleChange(event, 'units')}
          placeholder='pas, minutes de course…'
          required
          value={state.units}
        />
        {isEditing ? (
          ''
        ) : (
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={state.keepOpen}
                  onChange={(event, checked) =>
                    handleChange(event, 'keepOpen', checked)
                  }
                />
              }
              label='Garder ouvert pour l’ajout suivant'
            />
          </FormGroup>
        )}
      </DialogContent>
      <DialogActions>
        <Button color='secondary' onClick={onCancel} variant='text'>
          Annuler
        </Button>
        {isEditing ? (
          <Button color='primary' onClick={triggerAdd} variant='text'>
            <Edit />
            Modifier
          </Button>
        ) : (
          <Button color='primary' onClick={triggerAdd} variant='text'>
            <Add />
            Ajouter
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )

  function handleChange(event, field, checked) {
    if (field === 'keepOpen') {
      setState({ ...state, keepOpen: checked })
    } else {
      const caster = field === 'target' ? Number : String
      setState({ ...state, [field]: caster(event.target.value) })
    }
  }

  function triggerAdd() {
    onAdd(state)

    setState(DEFAULT_STATE)
  }
}

AddSettingDialog.propTypes = {
  goal: oneOfType([GoalPropType, shape({})]),
  onAdd: func.isRequired,
  onCancel: func.isRequired,
  open: bool.isRequired,
}

export default AddSettingDialog

// Champ de mot de passe basculable

import { useState } from 'react'

import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

export const TogglablePasswordField = (props) => {
  const [visible, setVisible] = useState(false)

  const type = visible ? 'text' : 'password'
  const label = visible ? 'Masquer le mot de passe' : 'Voir le mot de passe'
  const icon = visible ? <VisibilityOff /> : <Visibility />
  const endAdornment = (
    <InputAdornment position='end'>
      <IconButton arial-label={label} onClick={toggleVisible} title={label}>
        {icon}
      </IconButton>
    </InputAdornment>
  )

  return <TextField {...props} InputProps={{ endAdornment }} type={type} />

  function toggleVisible() {
    setVisible((visible) => !visible)
  }
}

TogglablePasswordField.propTypes = TextField.propTypes

export default TogglablePasswordField

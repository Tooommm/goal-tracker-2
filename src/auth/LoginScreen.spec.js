// Écran de connexion (tests)
// ==========================

import { Provider } from 'react-redux'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LoginScreen from './LoginScreen'
import { makeStore } from '../store'

import '@testing-library/jest-dom/extend-expect'

describe('<LoginScreen />', () => {
  it('should adjust button when logged-out based on values', async () => {
    setup('logged-out')

    const button = screen.getByRole('button', { name: 'Connecte-toi' })

    expect(button).toBeDisabled()

    const emailField = screen.getByLabelText(/E-mail/)

    await userEvent.type(emailField, 'foo@bar.com')
    expect(button).toBeDisabled()

    const passwordField = screen.getByLabelText(/Mot de passe/)
    await userEvent.type(passwordField, 'foo')

    expect(button).toBeEnabled()
  })

  it('should disable the button when pending', () => {
    setup('pending')
    expect(screen.getByRole('button', { name: 'Connecte-toi' })).toBeDisabled()
  })

  it('should restore the button and display a snackbar on failure', () => {
    setup('failure')
    expect(screen.getByRole('button', { name: 'Connecte-toi' })).toBeDisabled()
    expect(
      screen.getByText('Identifiant ou mot de passe invalide')
    ).toBeInTheDocument()
  })

  function setup(loginState) {
    const store = makeStore({ currentUser: { loginState } })
    render(
      <Provider store={store}>
        <LoginScreen />
      </Provider>
    )
  }
})

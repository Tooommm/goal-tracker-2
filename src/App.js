// Composant principal applicatif
// ==============================

import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router } from 'react-router-dom'

import HistoryScreen from './history/HistoryScreen'
import HomeScreen from './main/HomeScreen'
import PrivateRoute from './shared/PrivateRoute'
import SettingsScreen from './settings/SettingsScreen'
import store from './store'

const App = () => (
  <Provider store={store}>
    <Router>
      <>
        <Route exact path='/' component={HomeScreen} />
        <PrivateRoute exact path='/settings' component={SettingsScreen} />
        <PrivateRoute exact path='/history' component={HistoryScreen} />
      </>
    </Router>
  </Provider>
)

export default App

import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import snippet from './snippet'
import codeBrowser from './codeBrowser'
import auth  from './auth'

export default combineReducers({
  router: routerReducer,
  codeBrowser,
  snippet,
  auth,
  counter
})

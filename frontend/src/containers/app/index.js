import React from 'react';
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import About from '../about'
import Browse from '../browse'
import Snippet from '../snippet'
import Auth from '../auth'
import MenuHeader from '../../components/menu'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const App = (props) => (
  <div>
    <MenuHeader />
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/browse" component={Browse} />
      <Route exact path="/snippet/:id" component={Snippet} />
      <Route exact path="/auth" component={Auth} />
    </main>
  </div>
)


export default App

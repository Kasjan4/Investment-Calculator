import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.scss'
import Home from './components/Home'


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/Investment-Calculator" component={Home}/>
    </Switch>
  </BrowserRouter>
)

export default App


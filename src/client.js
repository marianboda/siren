'use strict'
var React = require('react')
var ReactDom = require('react-dom')

import * as Actions from './actions'
import store from './store'
import {App} from './components/App'

console.log(App)

ReactDom.render(<App/>, document.getElementById('content'))

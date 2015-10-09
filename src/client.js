'use strict'
var React = require('react')
var ReactDom = require('react-dom')

import Actions from './actions'
import store from './store'

class List extends React.Component {
  render() {
    let posts = store.getState().get('posts')
    console.log('items', posts)

    let items = posts.map((item) => { let itemId = 'post-'+item.get('id'); return <li key={itemId}>{item.get('title')}</li> })
    return <ul>{items}</ul>
  }
}
let unsubscribe
class App extends React.Component {
  constructor(props) {
    super(props)
    this.storeChangeHandler = this.storeChangeHandler.bind(this)
  }

  componentDidMount() {
    console.log('componentDidMount')
    unsubscribe = store.subscribe(this.storeChangeHandler)
  }
  storeChangeHandler(event) {
    console.log('change in store')
    this.setState({})
  }
  buttonHandler(event) {
    console.log('clicked')
    store.dispatch(Actions.ADD_POST)
  }
  render() {
    return <div>
      <List />
      <button onClick={this.buttonHandler}>ADD</button>
      </div>
  }
}

let app = <List name="Svet"/>

ReactDom.render(<App/>, document.getElementById('content'))

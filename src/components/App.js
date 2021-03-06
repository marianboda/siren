'use strict'
var React = require('react')

import * as Actions from '../actions'
import store from '../store'

class List extends React.Component {
  render() {
    let posts = store.getState().get('posts')
    console.log('items', posts)

    let items = posts.map((item) => {
      let itemId = 'post-'+item.get('id')
      return <li key={itemId}>{item.get('title')}</li>
    })
    return <ul>{items}</ul>
  }
}

let unsubscribe

export class App extends React.Component {
  constructor(props) {
    super(props)
    this.storeChangeHandler = this.storeChangeHandler.bind(this)
  }

  componentDidMount() {
    unsubscribe = store.subscribe(this.storeChangeHandler)
  }
  componentWillUnmount() {
    unsubscribe()
  }
  storeChangeHandler(event) {
    console.log('change in store')
    this.setState({})
  }
  buttonHandler(event) {
    console.log('clicked')
    store.dispatch(Actions.addPost())
  }
  getMore(event) {
    console.log('get more')
    store.dispatch(Actions.getPosts())
  }
  render() {
    return <div>
        <List />
        <button onClick={this.buttonHandler}>ADD</button>
        <button onClick={this.getMore}>GET MORE</button>
      </div>
  }
}

import { createStore, applyMiddleware } from 'redux'
import I from 'immutable'

import * as Actions from './actions'
import {fetcher} from './fetcher'

var initialState = I.fromJS({
  posts: [
    {id: 1, title: 'prvy post'},
    {id: 2, title: 'druhy post'},
    {id: 3, title: 'treti post'},
  ]
})

var reducer = function(state = initialState, action) {
  console.log('running reducer')
  switch (action.type) {
    case Actions.ADD_POST:
      let posts = state.get('posts')
      let lastPost = posts.last()
      let newId = lastPost.get('id') + 1
      let newState = state.updateIn(['posts'], list => list.push(I.fromJS({id: newId, title: `post ${newId}`})))
      console.log('newState', newState)
      return newState
    case Actions.GET_POSTS:
    default:
      return state;
  }
}

let store = applyMiddleware(fetcher)(createStore)(reducer)

module.exports = store

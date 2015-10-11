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
      let newId = posts.last().get('id') + 1
      return state.updateIn(['posts'], list => list.push(I.fromJS({id: newId, title: `post ${newId}`})))
    case Actions.POSTS_RECEIVED:
      return state.set('posts', I.fromJS(action.payload.posts))
    default:
      return state;
  }
}

let store = applyMiddleware(fetcher)(createStore)(reducer)

module.exports = store

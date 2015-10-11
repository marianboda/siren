import request from 'superagent'
import * as Actions from './actions'

export const fetcher = store => next => action => {
  console.log('action', action.type, action.payload)
  if (action.type == Actions.GET_POSTS)
    request.get('/api/posts').end((err,res) => {
      console.log('fetcher', err, res)
      if (err == null)
        store.dispatch( Actions.postsReceived(JSON.parse(res.text)))
    })
  return next(action)
}

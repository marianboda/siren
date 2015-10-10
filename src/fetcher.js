import request from 'superagent'
import {GET_POSTS} from './actions'

export const fetcher = store => next => action => {
  console.log('action', action.type, action.payload)
  if (action.type == GET_POSTS)
    request.get('/api/posts').end((err,res) => console.log(err, res))
}

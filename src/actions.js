export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POSTS'
export const POSTS_RECEIVED = 'POSTS_RECEIVED'

export function addPost(payload) {
  return { type: ADD_POST, payload }
}

export function getPosts(page) {
  return { type: GET_POSTS, payload: {page: page} }
}

export function postsReceived(posts) {
  return { type: POSTS_RECEIVED, payload: {posts: posts} }
}

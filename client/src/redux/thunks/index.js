import axios from 'axios'
import { setPosts } from '../slices'


export const getPosts = () => dispatch =>
  axios
    .get('http://localhost:5555/api/posts')
    .then(res => dispatch(setPosts(res.data)))
    .catch(err => console.log(err))
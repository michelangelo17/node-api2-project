import React, { useEffect } from 'react'
import { getPosts } from './redux/thunks'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const { posts } = useSelector(state => state)
  useEffect(() => {
    dispatch(getPosts())
  }, [dispatch])

  return (
    <>
      <h1>Server App</h1>
      {posts.map((post, i) => (
        <div key={i}>
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
        </div>
      ))}
    </>
  )
}

export default App

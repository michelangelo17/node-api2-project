import React from 'react'
import App from './App'
import { renderWithReduxThunk } from './utils'

test('renders app without crashing', () => {
  renderWithReduxThunk(<App />)
})

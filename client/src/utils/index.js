import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import rootReducer from '../redux/slices'
import thunk from 'redux-thunk'

export const renderWithReduxThunk = (
  ui,
  {
    initialState,
    store = createStore(rootReducer, applyMiddleware(thunk), initialState),
  } = {}
) => {
  const rendered = render(
    <Provider store={store}>{ui}</Provider>,
    ({ initialState, store = createStore(rootReducer, initialState) } = {})
  )
  return {
    ...rendered,
    rerender: (ui, options) =>
      renderWithReduxAndRouter(ui, {
        container: rendered.container,
        ...options,
      }),
  }
}

import { configureStore } from '@reduxjs/toolkit'
import serviceSlice from './Service/serviceSlice'
import eventSlice from './Event/eventSlice'
const reducer = {
  serviceReduxStore: serviceSlice,
  eventReduxStore: eventSlice,
}
export const store = configureStore({
    reducer
})
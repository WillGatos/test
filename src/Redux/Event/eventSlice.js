import { createSlice } from '@reduxjs/toolkit'

const eventSlice = createSlice({
  name: 'event',
  initialState:[],
  reducers: {
    getMoreEvents: (state, action) => {
      return [...state, ...action.payload]
    },
    eraseAllEvents: (state)=>{
        state.splice(0,state.length)
    },
    changeLikeEvents : (state, action)=>{
      const { liked, serviceId } = action.payload
      if(liked){
          const serviceMapped = state.map(service =>{
            if(service._id===serviceId){
              service.numberOfLikes ++;
            }
            return service})
          state = serviceMapped
       }else{
          const serviceMapped = state.map(service =>{
            if(service._id===serviceId){
              service.numberOfLikes --;
            }
            return service})
          state = serviceMapped
       }
    }
  },
})

// Action creators are generated for each case reducer function
export const { getMoreEvents, eraseAllEvents, changeLikeEvents } = eventSlice.actions

export default eventSlice.reducer
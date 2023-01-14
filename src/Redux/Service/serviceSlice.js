import { createSlice } from '@reduxjs/toolkit'

export const serviceSlice = createSlice({
  name: 'service',
  initialState: [],
  reducers: {
    getMoreServices: (state, action) => {
        return [...state, ...action.payload]
    },
    eraseAllServices: (state)=>{
        state.splice(0,state.length)
    },
    changeLikeServices : (state, action)=>{
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
export const { getMoreServices, eraseAllServices, changeLikeServices } = serviceSlice.actions

export default serviceSlice.reducer
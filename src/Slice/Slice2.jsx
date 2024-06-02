import { createSlice } from '@reduxjs/toolkit'
const CrudMethods = createSlice({
    name: "persons",
    initialState: {
        data: [],
    },
    reducers: {
        MethodPost: (state, action) => {
            state.data.push(action.payload)
        },
        MethodGet: (state, action) => {
            state.data = action.payload
        },
        MethodPut: (state, action) => {
            const { id, name } = action.payload
            const filtroID = state.value.find(i => i.id === id)

            filtroID.name = filtroID ? name : false
        },
        MethodDelete: (state, action) => {
            const id = action.payload
            state.data = state.data.filter(e => e.id !== id)
            // console.log(id)
            // console.log(state.data.map(e => e.id))
        }
    }
})

export const { MethodDelete, MethodGet, MethodPost, MethodPut } = CrudMethods.actions
export default CrudMethods
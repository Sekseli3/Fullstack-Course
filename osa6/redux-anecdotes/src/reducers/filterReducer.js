import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
	name: 'filter',
	initialState: '',
	reducers: {
		createFilter(_state, action) {
			const filter = action.payload
			return filter
		}
	}
})

export const { createFilter } = filterSlice.actions
export default filterSlice.reducer
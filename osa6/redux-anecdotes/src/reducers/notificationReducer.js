
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''
const notificationSlice = createSlice({
	name: 'notification',
	initialState:initialState,
	reducers: {
		createNotification(state, action) {
			const notification = action.payload
			return notification
		},
		deleteNotification(state, action) {
			return initialState
		}
	}
})
export const { createNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer


export const makeNotification = (message, delay ) => {
	return async dispatch => {
	  dispatch(createNotification(message))
	  setTimeout(() => {
		dispatch(deleteNotification())
	  }, delay*1000)
	}
  }
  
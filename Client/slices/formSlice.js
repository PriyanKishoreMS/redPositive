import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import "../config";

export const postForm = createAsyncThunk("user/postForm", async details => {
	console.log("postForm", details);
	return await fetch(`http://${IP}/api/mail`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(details),
	})
		.then(res => res.json())
		.then(data => {
			return data;
		})
		.catch(err => console.error(err));
});

const formSlice = createSlice({
	name: "form",
	initialState: {
		name: "",
		email: "",
		message: "",
		phone: "",
	},
	reducers: {
		setName: (state, action) => {
			state.name = action.payload;
		},
	},
});

export default formSlice.reducer;

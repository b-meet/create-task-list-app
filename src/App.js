import { useState, useEffect, useReducer, useRef } from "react";
import List from "./List";
import Message from "./message";

//to preserve value on reload

const getLocalStorage = () => {
	if (localStorage.getItem("list")) {
		return JSON.parse(localStorage.getItem("list"));
	} else {
		return [];
	}
};

function App() {
	const reducer = (state, action) => {
		if (action.type === "ADD_CHORE") {
			return {
				...state,
				list: [...state.list, action.payload],
				messageContent: "Chore Added",
				messageStyle: "message-green",
			};
		}

		if (action.type === "NO_VALUE") {
			return {
				...state,
				messageContent: "Please Write A Chore",
				messageStyle: "message-red",
			};
		}

		if (action.type === "DELETE_CHORE") {
			return {
				...state,
				list: action.payload,
				messageContent: "Chore deleted",
				messageStyle: "message-red",
			};
		}

		if (action.type === "CLEAR_ALL") {
			return {
				...state,
				list: [],
				messageContent: "List was Cleared",
				messageStyle: "message-red",
			};
		}

		if (action.type === "CLOSE_MESSAGE") {
			return {
				...state,
				messageContent: "",
				messageStyle: "",
			};
		}

		if (action.type === "EDIT_CHORE") {
			return {
				...state,
				messageContent: "Edit Your Chore",
				messageStyle: "message-red",
				isEditing: true,
				editId: action.payload,
			};
		}

		if (action.type === "SUBMIT_EDIT") {
			return {
				...state,
				list: action.payload,
				messageContent: "Chore Updated",
				messageStyle: " message-green",
				isEditing: false,
				editId: "",
			};
		}
	};

	const initialState = {
		list: getLocalStorage(),
		messageContent: "",
		messageStyle: "",
		isEditing: false,
		editId: "",
	};

	const [input, setInput] = useState(""); //the value entered by user
	const [state, dispatch] = useReducer(reducer, initialState);
	const refContainer = useRef(undefined);

	//get the input by user

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	useEffect(() => {
		localStorage.setItem("list", JSON.stringify(state.list));
	}, [state.list]);

	//runs when user clicks add btn or hits enter

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input && state.isEditing) {
			const newEditedList = state.list.map((item) => {
				if (item.id === state.editId) {
					return { ...item, chore: input };
				}
				return item;
			});
			dispatch({ type: "SUBMIT_EDIT", payload: newEditedList });
			setInput("");
		} else if (input) {
			const newItem = { id: new Date().getTime().toString(), chore: input };
			dispatch({ type: "ADD_CHORE", payload: newItem });
			setInput("");
		} else {
			dispatch({ type: "NO_VALUE" });
		}
	};

	//runs on deleting any chore

	const handleDelete = (id) => {
		let newList = state.list.filter((item) => {
			return id !== item.id;
		});
		console.log(newList);
		dispatch({ type: "DELETE_CHORE", payload: newList });
	};

	// runs when the user wants to edit the chore

	const handleEdit = (id) => {
		const specificItem = state.list.find((item) => item.id === id);
		setInput(specificItem.chore);
		dispatch({ type: "EDIT_CHORE", payload: id });
		refContainer.current.focus();
	};

	//runs when user click clearAll btn

	const handleClearAll = () => {
		dispatch({ type: "CLEAR_ALL" });
	};

	return (
		<section className='content-container'>
			<Message
				dispatch={dispatch}
				style={state.messageStyle}
				message={state.messageContent}
			/>
			<h2 className='heading'>Task List</h2>
			<form className='form-container'>
				<input
					type='text'
					name='item'
					id='item'
					value={input}
					ref={refContainer}
					onChange={handleChange}
					placeholder='Type your chore'
				/>
				<button onClick={handleSubmit} type='submit' className='btn'>
					{state.isEditing ? "Edit" : "Add"}
				</button>
			</form>
			<List data={state.list} remove={handleDelete} edit={handleEdit} />
			{state.list.length <= 0 || (
				<section className='clear-btn-container'>
					<button type='reset' className='clear-btn' onClick={handleClearAll}>
						Clear All
					</button>
				</section>
			)}
		</section>
	);
}

export default App;

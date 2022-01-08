import { useState, useEffect } from "react";
import List from "./List";

//to preserve value on reload

const getLocalStorage = () => {
	if (localStorage.getItem("list")) {
		return JSON.parse(localStorage.getItem("list"));
	} else {
		return [];
	}
};

function App() {
	const [input, setInput] = useState(""); //the value entered by user
	const [list, setList] = useState(getLocalStorage()); //storage of the values
	const [message, setMessage] = useState(""); //message to be displayed based on activity
	const [style, setStyle] = useState(""); //Style to be applied on the message
	const [isEditing, setIsEditing] = useState(false);
	const [editId, setEditId] = useState("");

	//get the input by user

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			setMessage("");
			setStyle("");
		}, 3000);
		return () => clearTimeout(timeout);
	}, [message, style]);

	useEffect(() => {
		localStorage.setItem("list", JSON.stringify(list));
	}, [list]);

	//runs when user clicks add btn or hits enter

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input && isEditing) {
			setList(
				list.map((item) => {
					if (item.id === editId) {
						return { ...item, chore: input };
					}
					return item;
				})
			);
			setInput("");
			setEditId("");
			setIsEditing(false);
			setMessage("Chore was updated");
			setStyle("message-green");
		} else if (input) {
			const value = { chore: input, id: new Date().getTime().toString() };
			setList([...list, value]);
			setMessage("Chore Added");
			setStyle("message-green");
			setInput("");
		} else {
			setMessage("Please Add Some Chore");
			setStyle("message-red");
		}
	};

	//runs on deleting any chore

	const handleDelete = (id) => {
		let newList = list.filter((item) => {
			return id !== item.id;
		});
		setList(newList);
		setMessage("Chore was deleted");
		setStyle("message-red");
	};

	// runs when the user wants to edit the chore

	const handleEdit = (id) => {
		const specificItem = list.find((item) => item.id === id);
		setInput(specificItem.chore);
		setIsEditing(true);
		setEditId(id);
		setMessage("Edit Your chore");
		setStyle("message-green");
	};

	//runs when user click clearAll btn

	const handleClearAll = () => {
		setList([]);
		setMessage("List was Cleared");
		setStyle("message-red");
	};

	return (
		<section className='content-container'>
			<p className={style}>{message}</p>
			<h2 className='heading'>Task List</h2>
			<form className='form-container'>
				<input
					type='text'
					name='item'
					id='item'
					value={input}
					onChange={handleChange}
					placeholder='Type your chore'
				/>
				<button onClick={handleSubmit} type='submit' className='btn'>
					{isEditing ? "Edit" : "Add"}
				</button>
			</form>
			<List data={list} remove={handleDelete} edit={handleEdit} />
			{list.length <= 0 || (
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

import { useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function App() {
	const [input, setInput] = useState("");
	const [list, setList] = useState([]);
	const [message, setMessage] = useState("");

	const handleChange = (e) => {
		setInput(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (input) {
			setList([...list, input]);
			setInput("");
		} else {
			setMessage("Please Add Some Chore");
		}
	};

	return (
		<section className='content-container'>
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
					Add
				</button>
			</form>
			{list.map((item) => {
				return (
					<ul className='list-container'>
						<li className='list-data'>
							<p>{item}</p>
							<div>
								<button type='button' className='edit-btn'>
									<FiEdit />
								</button>
								<button type='button' className='delete-btn'>
									<FiTrash2 />
								</button>
							</div>
						</li>
					</ul>
				);
			})}
		</section>
	);
}

export default App;

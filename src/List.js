import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = ({ data, remove, edit }) => {
	return data.map(({ id, chore }) => {
		return (
			<ul key={id} className='list-container'>
				<li className='list-data'>
					<p>{chore}</p>
					<div>
						<button type='button' className='edit-btn' onClick={() => edit(id)}>
							<FaEdit />
						</button>
						<button
							type='button'
							className='delete-btn'
							onClick={() => remove(id)}
						>
							<FaTrash />
						</button>
					</div>
				</li>
			</ul>
		);
	});
};

export default List;

import React from "react";
import { useEffect } from "react";

const Message = ({ message, style, dispatch }) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			dispatch({ type: "CLOSE_MESSAGE" });
		}, 3000);
		return () => {
			clearTimeout(timeout);
		};
	}, [message, style]);

	return <p className={style}>{message}</p>;
};

export default Message;

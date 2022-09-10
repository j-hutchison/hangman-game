import React, { useState, useRef } from "react";

const useGlobalState = (initialValue) => {
	const [state, _setState] = useState(initialValue);
	const stateRef = useRef(state);
	const setState = (data) => {
		if (typeof data === "string") {
			stateRef.current = data;
			_setState(() => data);
		} else if (typeof data === "boolean") {
			stateRef.current = data;
			_setState(() => data);
		} else if (Array.isArray(data)) {
			stateRef.current = [...data];
			_setState(() => [...data]);
		}
	};

	return {
		value: stateRef,
		setState: setState,
	};
};

export default useGlobalState;

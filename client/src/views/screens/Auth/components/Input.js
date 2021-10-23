import React from 'react';

function Input({
	nameInput,
	placeholder = '',
	type = 'text',
	className = '',
	id = '',
	value,
	onChange,
}) {
	return (
		<div className={`group-form ${className}`}>
			<input
				type={type}
				name={nameInput}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
			/>
		</div>
	);
}

export default Input;

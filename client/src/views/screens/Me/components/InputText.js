import React from 'react';

function InputText({ name, label, handleChange, placeholder, className = '' }) {
	const handleEnter = e => {
		const keyCode = e.which || e.keyCode;
		keyCode === 13 && e.preventDefault();
	};

	return (
		<div className={`form-group ${className}`}>
			<label>{label}</label>
			<input
				onChange={handleChange}
				onKeyPress={handleEnter}
				name={name}
				className="input-element"
				placeholder={placeholder}
			/>
		</div>
	);
}

export default InputText;

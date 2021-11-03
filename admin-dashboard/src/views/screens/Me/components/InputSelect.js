import React from 'react';

function InputSelect({
	options = [],
	handleChange,
	placeholder,
	label,
	className,
	name,
}) {
	return (
		<div className={`form-group ${className}`}>
			<label>{label}</label>
			<select
				onChange={handleChange}
				name={name}
				className="input-element"
				placeholder={placeholder}
			>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.text}
					</option>
				))}
			</select>
		</div>
	);
}

export default InputSelect;

export const pasteAsPlainText = event => {
	event.preventDefault();

	const text = event.clipboardData.getData('text/plain');
	document.execCommand('insertHTML', false, text);
};

export const trimSpaces = string => {
	return string
		.replace(/&nbsp;/g, '')
		.replace(/&amp;/g, '&')
		.replace(/&gt;/g, '>')
		.replace(/&lt;/g, '<');
};

export const disableNewlines = event => {
	const keyCode = event.keyCode || event.which;

	if (keyCode === 13) {
		event.returnValue = false;
		if (event.preventDefault) event.preventDefault();
	}
};

export function getItemStorage(key) {
	if (localStorage.getItem(key) !== 'undefined') {
		return JSON.parse(localStorage.getItem(key));
	} else {
		return null;
	}
}

export function setItemStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

export function deleteItemStorage(...keys) {
	keys.forEach(key => {
		localStorage.removeItem(key);
	});
}

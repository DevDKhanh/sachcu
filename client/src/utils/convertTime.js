export const convertTime = date => {
	const nowTime = Number(new Date());
	const datePost = new Date(date);
	let dataNumber = Number(date);

	const dayPost = datePost.getDate();
	const monthPost = datePost.getMonth() + 1;
	const yearPost = datePost.getFullYear();

	const sec = Math.ceil((nowTime - dataNumber) / 1000);
	const min = Math.ceil((nowTime - dataNumber) / 1000 / 60);
	const hour = Math.ceil((nowTime - dataNumber) / 1000 / 60 / 60);

	if (sec < 60) {
		dataNumber = 'Vừa xong';
	} else if (min < 60) {
		dataNumber = `${min} phút trước`;
	} else if (hour < 24) {
		dataNumber = `${hour} giờ trước`;
	} else {
		dataNumber = `${dayPost}, tháng ${monthPost}, ${yearPost}`;
	}
	return dataNumber;
};

export const oldTime = time => {
	let timeCmt = new Date(time);
	let min = timeCmt.getMinutes();
	let hours = timeCmt.getHours();
	let today = timeCmt.getDay() + 1;
	let day = timeCmt.getDate();
	let month = timeCmt.getMonth() + 1;
	let year = timeCmt.getFullYear();
	if (today === 1) today = 'CN';
	return `${
		today === 'CN' ? '' : 'Thứ'
	} ${today}, ${day} tháng ${month} ${year} lúc ${hours}:${min}`;
};

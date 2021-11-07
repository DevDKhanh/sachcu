import icon1 from '../assets/images/icon-english.png';
import icon2 from '../assets/images/icon-lite.png';
import icon3 from '../assets/images/icon-math.jpg';
import icon4 from '../assets/images/icon-tech.png';

export const baseList = [
	{
		value: 'van',
		text: 'Văn học',
		icon: icon1,
	},
	{
		value: 'toan',
		text: 'Toán học',
		icon: icon2,
	},
	{
		value: 'cntt',
		text: 'Công nghệ thông tin',
		icon: icon3,
	},
	{
		value: 'ta',
		text: 'Tiếng anh',
		icon: icon4,
	},
];

const listCategory = [
	{
		value: null,
		text: 'Lựa chọn',
	},
	...baseList,
	{
		value: 'o',
		text: 'Khác...',
	},
];

export default listCategory;

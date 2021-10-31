import axiosClient from '.';
import { getItemStorage } from '../utils/localStorage';

const routeName = '/comments';

const commentsAPI = {
	getCommentOfPage: (slug, limit = 3, isReply = false) => {
		const url = `${routeName}/page?slug=${slug}&limit=${limit}&isReply=${isReply}`;
		return axiosClient.get(url, {
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
};

export default commentsAPI;

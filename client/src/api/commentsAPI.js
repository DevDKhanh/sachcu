import axiosClient from '.';
import { getItemStorage } from '../utils/localStorage';

const routeName = '/comments';

const commentsAPI = {
	getCommentOfPage: (slug, limit = 3, isReply = false, page = 1) => {
		const url = `${routeName}/page?slug=${slug}&limit=${limit}&page=${page}&isReply=${isReply}`;
		return axiosClient.get(url, {
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
};

export default commentsAPI;

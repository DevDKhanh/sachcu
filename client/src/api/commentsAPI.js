import axiosClient from '.';
import { getItemStorage } from '../utils/localStorage';

const routeName = '/comments';

const commentsAPI = {
	getCommentOfPage: (
		slug,
		limit = 3,
		isReply = false,
		page = 1,
		tokenAxios,
	) => {
		const url = `${routeName}/page?slug=${slug}&limit=${limit}&page=${page}&isReply=${isReply}`;
		return axiosClient.get(url, {
			cancelToken: tokenAxios,
			headers: {
				Authorization: 'Bearer ' + getItemStorage('accessToken'),
			},
		});
	},
};

export default commentsAPI;

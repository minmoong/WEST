export type PostPreview = {
	id: number;
	createdAt: Date;
	category: string;
	title: string;
	views: number;
	author: {
		username: string;
	};
};

export type PostComment = {
	createdAt: Date;
	content: string;
	author: {
		id: number;
		username: string;
	};
};

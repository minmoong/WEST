export type PostPreview = {
	id: number;
	createdAt: Date;
	category: string;
	title: string;
	views: number;
	author: {
		username: string;
	} | null;
};

export type PostComment = {
	id: number;
	createdAt: Date;
	content: string;
	author: {
		id: number;
		username: string;
	} | null;
};

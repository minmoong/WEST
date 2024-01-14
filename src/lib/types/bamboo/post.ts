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

export interface GetCategorySummaryRequest {
	idUser?: string;
	startDate?: string;
	endDate?: string;
}

export interface CategoryData {
	category: string;
	total: number;
	count: number;
	percentage: number;
}

export interface GetCategorySummaryResponse {
	expenses: {
		categories: CategoryData[];
		total: number;
	};
	incomes: {
		categories: CategoryData[];
		total: number;
	};
	balance: number;
}

import { SelectButtonType } from "@/components/ui/Card/CardTableHistoryTransaction/CardTableHistoryTransaction";
import type { ExpenseCategory } from "./Expense";
import type { IncomeCategory } from "./Income";

export type TransactionsTypes = "income" | "expense" | "subscription";

export interface Transaction {
	id: string;
	idUser: string;
	description: string;
	value: number;
	category: ExpenseCategory | IncomeCategory;
	type: TransactionsTypes;
	createdAt: Date;
	updatedAt?: Date;
}

export interface GetTransactionsRequest {
	description?: string;
	type?: TransactionsTypes | SelectButtonType;
	category?: string;
	startDate?: string;
	endDate?: string;
	page?: number;
	limit?: number;
}

export interface GetTransactionsResponse {
	transactions: Transaction[];
	summary: {
		totalExpenses: number;
		totalIncomes: number;
		balance: number;
	};
	pagination: PaginationMeta;
}

export interface TransactionFilter {
	idUser: string;
	type?: TransactionsTypes;
	category?: string;
	startDate?: Date;
	endDate?: Date;
}

export interface PaginationParams {
	page: number;
	limit: number;
}

export interface PaginationMeta {
	currentPage: number;
	itemsPerPage: number;
	totalItems: number;
	totalPages: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
	data: T[];
	meta: PaginationMeta;
}

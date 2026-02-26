import { PaginationMeta, TransactionsTypes } from "./Transaction";

export const INCOME_CATEGORIES = ['Salário', 'Investimentos', 'Freelancer', 'Outros'] as const;

export type IncomeCategory = typeof INCOME_CATEGORIES[number];

export interface Income {
    id: string;
    idUser: string;
    description: string;
    type: TransactionsTypes;
    value: number;
    category: IncomeCategory;
    createdAt: Date;
    updatedAt?: Date;
};

export interface GetIncomesRequest {
    description?: string;
    type?: TransactionsTypes;
    category?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

export interface CreatedIncomeData {
    description: string;
    value: number;
    category: IncomeCategory;
};

export interface GetAllIncomesResponse {
    incomes: Income[];
    total: number;
}

export interface GetIncomeResponse {
    incomes: Income[];
    summary: {
        totalExpenses: number;
        totalIncomes: number;
        balance: number;
    };
    pagination: PaginationMeta;
}

export interface UpdatedIncomeData {
    description?: string;
    value?: number;
    category?: IncomeCategory;
}
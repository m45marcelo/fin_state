import { PaginationMeta, TransactionsTypes } from "./Transaction";

export const EXPENSE_CATEGORIES = [
    'Supermercado',
    'Moradia',
    'Entretenimento',
    'Transporte',
    'Educação',
    'Saúde',
    'Vestuário',
    'Outros',
] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];

export interface Expense {
    id: string;
    idUser: string;
    description: string;
    type: TransactionsTypes;
    value: number;
    category: ExpenseCategory;
    createdAt: Date;
    updatedAt?: Date;
}

export interface GetExpensesRequest {
    description?: string;
    type?: TransactionsTypes;
    category?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
}

export interface DeleteExpenseRequest {
    id: string;
    type: TransactionsTypes;
}

export interface CreatedExpenseData {
    description: string;
    value: number;
    category: ExpenseCategory;
}

export interface GetAllExpensesResponse {
    expenses: Expense[];
    total: number;
}

export interface GetExpenseResponse {
    expenses: Expense[];
    summary: {
        totalExpenses: number;
        totalIncomes: number;
        balance: number;
    };
    pagination: PaginationMeta;
}

export interface UpdatedExpenseData {
    description?: string;
    value?: number;
    category?: ExpenseCategory;
}

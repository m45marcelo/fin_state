import { TransactionsTypes } from "./Transaction";

export const SUBSCRIPTION_CATEGORIES = [
    'Supermercado',
    'Moradia',
    'Entretenimento',
    'Transporte',
    'Educação',
    'Saúde',
    'Vestuário',
    'Outros',
] as const;

export const SUBSCRIPTION_FREQUENCIES = [
    'Mensal',
    'Anual',
    'Semanal',
    'Outra',
] as const;

export const SUBSCRIPTION_STATUS = ["Pago", "Pendente"] as const;

export type SubscriptionCategories = (typeof SUBSCRIPTION_CATEGORIES)[number];
export type SubscriptionFrequencies = (typeof SUBSCRIPTION_FREQUENCIES)[number];
export type SubscriptionStatus = (typeof SUBSCRIPTION_STATUS)[number];

export interface Subscription {
    id: string;
    idUser: string;
    description: string;
    type: TransactionsTypes;
    value: number;
    frequency: SubscriptionFrequencies;
    category: SubscriptionCategories;
    startDate: Date;
    nextPay: Date;
    status: SubscriptionStatus;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreatedSubscriptionData {
    description: string;
    value: number;
    frequency: SubscriptionFrequencies;
    category: SubscriptionCategories;
    startDate: Date;
    nextPay: Date;
}

export interface CreatedSubscriptionFormData {
    description: string;
    value: number;
    frequency: SubscriptionFrequencies;
    category: SubscriptionCategories;
    startDate: Date;
    nextPay: string;
}

export interface GetAllSubscriptionResponse {
    subscriptions: Subscription[],
    total: number;
}

export interface UpdatedSubscriptionData {
    id: string;
    description?: string;
    value?: number;
    frequency?: SubscriptionFrequencies;
    category?: SubscriptionCategories;
    startDate?: Date;
    nextPay?: Date;
    status?: SubscriptionStatus;
}
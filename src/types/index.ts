import type { IconType } from "react-icons";

export interface Link {
    name: string,
    href: string,
    icon: IconType
}

export const SUBSCRIPTION_CATEGORIES = [
    'Entretenimento',
    'Moradia',
    'Música',
    'Tecnologia',
    'Educação',
    'Transporte',
    'Saúde',
    'Outros',
] as const;

export type SubscriptionsCategories = (typeof SUBSCRIPTION_CATEGORIES)[number];

const STATUS_SUBSCRIPTION = ["Pago", "Pendente"] as const;
export type StatusSubscription = (typeof STATUS_SUBSCRIPTION)[number];
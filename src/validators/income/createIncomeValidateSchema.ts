import { INCOME_CATEGORIES } from '@/domain/entities/Income';
import {  z } from 'zod';

export const createIncomeValidateSchema = z.object({
    description: z
        .string()
        .min(1, "A descrição deve ter pelo menos 1 caractere")
        .max(100, "A descrição deve ter no máximo 100 caracteres")
        .trim(),
    value: z.coerce
        .number({ error: 'O valor não pode estar vázio'})
        .positive("O valor deve ser positivo"),
    category: z.enum(INCOME_CATEGORIES, {
            error: "Categoria inválida",
        }),
});

export type CreateIncomeTypeSchema = z.infer<typeof createIncomeValidateSchema>
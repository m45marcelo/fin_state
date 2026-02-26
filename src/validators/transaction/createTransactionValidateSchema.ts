import * as z from "zod";

export const createTransactionValidateSchema = z.object({
    description: z
        .string()
        .min(1, "A descrição deve ter pelo menos 1 caractere")
        .max(100, "A descrição deve ter no máximo 100 caracteres")
        .trim(),
    value: z.coerce
        .number({ error: 'O valor não pode estar vázio'})
        .positive("O valor deve ser positivo"),
    category: z
        .string()
});

export type CreateTransactionTypeSchema = z.infer<typeof createTransactionValidateSchema>
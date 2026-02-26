import * as z from "zod";

export const searchTransactionValidateSchema = z.object({
	description: z
		.string()
		.min(1, "A descrição deve ter pelo menos 1 caractere")
		.max(100, "A descrição deve ter no máximo 100 caracteres")
		.trim(),
});

export type SearchTransactionTypeSchema = z.infer<typeof searchTransactionValidateSchema>
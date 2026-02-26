import * as z from "zod";
import { SUBSCRIPTION_CATEGORIES, SUBSCRIPTION_FREQUENCIES } from "@/domain/entities/Subscription";
export const createSubscriptionValidateSchema = z.object({
	description: z
		.string()
		.min(1, "A descrição deve ter pelo menos 1 caractere")
		.max(100, "A descrição deve ter no máximo 100 caracteres")
		.trim(),
	value: z.coerce
		.number("O valor não pode estar vázio")
		.positive("O valor deve ser positivo"),
	category: z.enum(SUBSCRIPTION_CATEGORIES, {
		error: "Categoria inválida",
	}),
	startDate: z
		.coerce.date("Data de início é obrigatória")
		.min(1, "Data de início é obrigatória"),
	frequency: z.enum(SUBSCRIPTION_FREQUENCIES, {
		error: "Frequencia inválida"
		}),
	nextPay: z
		.coerce.date( "Próxima data de pagamento é obrigatória")
		.min(1,"Próxima data de pagamento é obrigatória"),
});

export type CreateSubscriptionTypeSchema = z.infer<typeof createSubscriptionValidateSchema>
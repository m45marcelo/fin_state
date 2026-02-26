import { z } from "zod";

export const authUserValidateSchema = z.object({
	email: z
		.email("Endereço de email inválido")
		.toLowerCase()
		.max(100, "Seu email deve conter no máximo 100 caracteres")
		.trim(),
	password: z
		.string()
		.min(6, "Sua senha deve conter ao menos 6 caracteres")
		.max(100, "Sua senha deve conter no maximo 100 caracteres")
		.trim(),
});

export type AuthUserTypeSchema = z.infer<typeof authUserValidateSchema>;
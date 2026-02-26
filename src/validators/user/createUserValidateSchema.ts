import { z } from "zod";

export const createUserValidateSchema = z
	.object({
		name: z
			.string()
			.min(3, "Seu nome deve conter ao menos 3 caracteres")
			.max(100, "Seu nome deve conter no máximo 100 caracteres")
			.trim(),
		email: z.email("Endereço de email inválido").toLowerCase().max(100, "Seu email deve conter no máximo 100 caracteres"),
		password: z
			.string()
			.min(6, "Sua senha deve conter ao menos 6 caracteres")
			.max(100, "Sua senha deve conter no máximo 100 caracteres")
			.trim(),
		repeatPassword: z.string(),
	})

	.refine((data) => data.password === data.repeatPassword, {
		path: ["repeatPassword"],
		message: "As senhas precisam ser iguais",
	});

export type CreateUserTypeSchema = z.infer<typeof createUserValidateSchema>;

import z from "zod";

export const updateUserValidateSchema = z.object({
    name: z
        .string()
        .min(1,"Nome deve ter ao menos 1 caractere")
        .max(100, "Nome deve ter no máximo 100 caracteres")
        .trim(),
    email: z
        .email("Endereço de email inválido").toLowerCase().max(100, "Seu email deve conter no máximo 100 caracteres"),

})

export type UpdateUserTypeSchema = z.infer<typeof updateUserValidateSchema>
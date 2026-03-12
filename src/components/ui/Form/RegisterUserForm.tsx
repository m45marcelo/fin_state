"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import styles from "@/components/ui/Card/AddTransactionCard/InputBorderStyle.module.css";
import {
	type CreateUserTypeSchema,
	createUserValidateSchema,
} from "@/validators/user/createUserValidateSchema";
import { CustomButton } from "../Button/CustomButton";
import { CustomText } from "../TextComponents/CustomText";
import { useCreateUserMutation } from "@/store/api/userApi";
import { MdPersonAdd } from "react-icons/md";
import { RegisterFormMessage } from "./RegisterFormMessage";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const RegisterUserForm = () => {
	const [ createUser, { isLoading, isSuccess, isError }] = useCreateUserMutation();
	const router = useRouter();

	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<CreateUserTypeSchema>({
		resolver: zodResolver(createUserValidateSchema),
	});

    async function onSubmit(data: CreateUserTypeSchema){
		const { name, email, password} = data;
		const userData= {
			name,
			email,
			password
		}

		try {
			await createUser(userData).unwrap();
			console.log("usuário criado")
			toast.success("Usuário criado com sucesso! Conecte-se agora")
			reset()
			router.replace("/login")
		} catch (err) {
			console.error("Erro ao criar usuário:", err);
		}
    }

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-[22.5rem]">
			<CustomText className="text-[1.375rem] text-center font-semibold mb-8 text-gray-800">Crie sua conta</CustomText>
			<div className="flex flex-col">
				<label
					className={`${styles.label_field} text-[0.75rem] mb-[0.25rem]`}
					htmlFor="name"
				>
					Nome Completo
				</label>
				<input
					id="name"
					type="text"
					placeholder="Seu nome completo"
					{...register("name")}
					className={clsx(
						"h-[2.8125rem] w-[22.5rem] mb-1",
						errors.name ? styles.input_field_error : styles.input_field,
					)}
				/>
				<span className="text-red-500 text-xs h-4 block">
					{errors.name?.message}
				</span>
			</div>

			<div className="flex flex-col">
				<label
					className={`${styles.label_field} text-[0.75rem] mb-[0.25rem]`}
					htmlFor="email"
				>
					Endereço de E-mail
				</label>
				<input
					id="email"
					type="text"
					placeholder="seuemail@exemplo.com"
					{...register("email")}
					className={clsx(
						"h-[2.8125rem] w-[22.5rem] mb-1",
						errors.email ? styles.input_field_error : styles.input_field,
					)}
				/>
				<span className="text-red-500 text-xs h-4 block">
					{errors.email?.message}
				</span>
			</div>

			<div className="flex flex-col">
				<label
					className={`${styles.label_field} text-[0.75rem] mb-[0.25rem]`}
					htmlFor="password"
				>
					Senha
				</label>
				<input
					id="password"
					type="password"
					placeholder="Crie sua senha"
					{...register("password")}
					className={clsx(
						"h-[2.8125rem] w-[22.5rem] mb-1",
						errors.password ? styles.input_field_error : styles.input_field,
					)}
				/>
				<span className="text-red-500 text-xs h-4 block">
					{errors.password?.message}
				</span>
			</div>

			<div className="flex flex-col">
				<label
					className={`${styles.label_field} text-[0.75rem] mb-[0.25rem]`}
					htmlFor="repeatPassword"
				>
					Confirmar Senha
				</label>
				<input
					id="repeatPassword"
					type="password"
					placeholder="Confirme sua senha"
					{...register("repeatPassword")}
					className={clsx(
						"h-[2.8125rem] w-[22.5rem] mb-1",
						errors.repeatPassword ? styles.input_field_error : styles.input_field,
					)}
				/>
				<span className="text-red-500 text-xs h-4 block">
					{errors.repeatPassword?.message}
				</span>
			</div>
			<CustomButton isLoading={isLoading} iconButton={MdPersonAdd} title="Criar Conta" className="text-[0.9375rem] h-[2.6875rem] mt-1 bg-indigo-500 hover:bg-indigo-600" type="submit" isPrimary/>
			<RegisterFormMessage isError={isError} isSuccess={isSuccess}/>
		</form>
	);
};

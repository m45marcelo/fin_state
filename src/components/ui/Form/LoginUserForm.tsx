"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "@/components/ui/Card/AddTransactionCard/InputBorderStyle.module.css";
import type { AuthenticateUserRequest } from "@/domain/entities/User";
import { useAuthUserMutation } from "@/store/api/userApi";
import {
	type AuthUserTypeSchema,
	authUserValidateSchema,
} from "@/validators/user/authUserValidateSchema";
import { CustomText } from "../TextComponents/CustomText";
import clsx from "clsx";
import { CustomButton } from "../Button/CustomButton";
import { MdOutlineLogin } from "react-icons/md";
import {  useState } from "react";
import { LoginFormMessage } from "./LoginFormMessage";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export const LoginUserForm = () => {
	const [authUser, { isSuccess, isLoading, isError }] = useAuthUserMutation();

    const [backendError, setBackendError] = useState("");
	const router = useRouter();

	const {
		register,
		reset,
		formState: { errors },
		handleSubmit,
	} = useForm<AuthUserTypeSchema>({
		resolver: zodResolver(authUserValidateSchema),
	});

	async function onSubmit(data: AuthenticateUserRequest) {
		try {
			await authUser(data).unwrap();
			reset();
			setBackendError("")
			toast.success("Login realizado com sucesso")
			router.replace("/")
		} catch (err: any) {
            setBackendError(err.data?.message)
		}
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col w-[22.5rem]"
		>
			<CustomText className="text-[1.375rem] text-center font-semibold mb-8 text-gray-800">
				Log sua conta
			</CustomText>
			<div className="flex flex-col">
				<label className={`${styles.label_field} text-[0.75rem] mb-[0.25rem]`} htmlFor="email">
					Endereço de E-mail
				</label>
                <input
                    id="email"
                    type="text"
                    placeholder="seuemail@exemplo.com"
                    {...register("email")}
					className={clsx(
						"h-[2.8125rem] w-[22.5rem] mb-1",
						errors.email || isError ? styles.input_field_error : styles.input_field,
					)}
                />
                <span className="text-red-500 text-xs mb-1 h-4 block">
                    {
                        errors.email ? errors.email.message  : backendError
                    }
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
					placeholder="Sua senha"
					{...register("password")}
					className={clsx(
						"h-[2.8125rem] w-[22.5rem] mb-1",
						errors.password || backendError ? styles.input_field_error : styles.input_field,
					)}
				/>
				<span className="text-red-500 text-xs mb-1 h-4 block">
					{
                        errors.password ? errors.password.message : backendError
                    }
				</span>
			</div>
            <CustomButton isLoading={isLoading}  iconButton={MdOutlineLogin} title="Entrar" stylesButton="text-[0.9375rem] mt-1 h-[2.6875rem] bg-indigo-500 hover:bg-indigo-600" type="submit" isPrimary/>
            <LoginFormMessage isSuccess={isSuccess}/>
		</form>
	);
};

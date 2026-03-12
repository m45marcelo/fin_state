"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import styles from "@/components/ui/Card/AddTransactionCard/InputBorderStyle.module.css";
import { useAppDispatch } from "@/hooks";
import { useGetMeQuery, useUpdateUserMutation } from "@/store/api/userApi";
import { closeModal } from "@/store/slices/modalSlice";
import {
	type UpdateUserTypeSchema,
	updateUserValidateSchema,
} from "@/validators/user/updateUserValidateSchema";
import { CustomButton } from "../../Button/CustomButton";

interface FormModalSettingProps{
	functionUpdateImage: () => Promise<void>;
}

export const FormModalSetting = ({ functionUpdateImage }: FormModalSettingProps) => {
	const {
		register,
		formState: { errors },
		reset,
		handleSubmit,
	} = useForm<UpdateUserTypeSchema>({
		resolver: zodResolver(updateUserValidateSchema),
	});
	const [updateUser, { isLoading }] = useUpdateUserMutation();

	const dispatch = useAppDispatch();

	const { data: userData } = useGetMeQuery();

    useEffect(() => {
		if (userData) {
			reset({
				name: userData.user.name,
				email: userData.user.email
			});
		}
	}, [reset, userData]);

	async function onSubmit(data: UpdateUserTypeSchema) {

		if (userData) {
			const selectionData = {
                id: userData.user.id,
                ...data
            }

			try {
				await updateUser(selectionData).unwrap();
				await functionUpdateImage()
				toast.success("Perfil editado com sucesso");
				console.log(data);
				
			} catch (error) {
				console.error("Ocorreu um erro ao tentar atualizar o usuário", error);
				toast.error("Ocorreu um erro ao tentar editar o usuário");
			}
		}

		dispatch(closeModal())
		reset();
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="w-full">
			<div className="w-full">
				<label
					htmlFor="name"
					className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
				>
					Nome Completo
				</label>
				<input
					id="name"
					type="text"
					placeholder="Digite seu nome"
					{...register("name")}
					className={clsx(
						"h-[2.625rem]",
						errors.name ? styles.input_field_error : styles.input_field,
					)}
				/>
				<span className="text-red-500 text-xs h-4 block">
					{errors.name?.message}
				</span>
			</div>
			<div className="w-full">
				<label
					htmlFor="email"
					className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
				>
					Email
				</label>
				<input
					id="email"
					type="text"
					placeholder="Digite seu nome"
					{...register("email")}
					className={clsx(
						"h-[2.625rem]",
						errors.email ? styles.input_field_error : styles.input_field,
					)}
				/>
				<span className="text-red-500 text-xs h-4 block">
					{errors.email?.message}
				</span>
			</div>
			
			<div className="flex w-full">
				<CustomButton
					type="submit"
					title="Salvar Alterações"
					className="text-[0.9375rem] w-full h-[2.375rem] bg-indigo-500 hover:bg-indigo-600"
					isPrimary
				/>
			</div>
		</form>
	);
};

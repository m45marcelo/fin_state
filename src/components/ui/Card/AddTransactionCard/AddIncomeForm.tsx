"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdAdd } from "react-icons/md";
import styles from "@/components/ui/Card/AddTransactionCard/InputBorderStyle.module.css";
import { useCreateIncomeMutation } from "@/store/api/incomeApi";
import { useGetMeQuery } from "@/store/api/userApi";
import { formatCurrencyInput } from "@/utils/formatCurrency";
import {
	type CreateIncomeTypeSchema,
	createIncomeValidateSchema,
} from "@/validators/income/createIncomeValidateSchema";
import { CustomButton } from "../../Button/CustomButton";
import { useAppDispatch } from "@/hooks";
import { openModal } from "@/store/slices/modalSlice";

export const AddIncomeForm = () => {
	const dispatch = useAppDispatch();
	const [createIncome, { isLoading }] = useCreateIncomeMutation();
	const { data: userData } = useGetMeQuery();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<CreateIncomeTypeSchema>({
		resolver: zodResolver(createIncomeValidateSchema) as any,
		defaultValues: {
			category: "Salário",
		},
	});

	const [displayValue, setDisplayValue] = useState("");

	useEffect(() => {
		reset({
			category: "Salário",
		});
		setDisplayValue("");
	}, [reset]);

	async function onSubmit(data: CreateIncomeTypeSchema) {
		setDisplayValue("");

		if (userData) {
			try {
				await createIncome(data).unwrap();
				reset();
				toast.success("Receita criada com sucesso");
			} catch (err) {
				console.error("Erro ao tentar criar uma receita:", err);
				toast.error("Ocorreu um erro ao tentar criar uma nova receita");
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
			<div className="w-full">
				<label
					className={`${styles.label_field} text-xs`}
					htmlFor="income-description"
				>
					Descrição
				</label>
				{userData ? (
					<>
						<input
							type="text"
							id="income-description"
							placeholder="Ex: Salário, Freelance"
							{...register("description")}
							className={clsx(
								"h-[2.625rem] mt-[0.3125rem]",
								errors.description
									? styles.input_field_error
									: styles.input_field,
							)}
						/>
						<span className="text-red-500 text-xs h-4 my-[0.125rem] mb-[0.125rem] block">
							{errors.description ? errors.description.message : null}
						</span>
					</>
				) : (
					<input
						type="text"
						id="income-description"
						placeholder="Ex: Salário, Freelance"
						className={clsx("h-[2.625rem] mt-[0.3125rem] mb-[1.25rem]", styles.input_field)}
					/>
				)}
			</div>

			<div className="w-full">
				<label
					className={`${styles.label_field} text-xs`}
					htmlFor="income-value"
				>
					Valor
				</label>
				{userData ? (
					<>
						<input
							type="text"
							id="income-value"
							placeholder="0.00"
							value={displayValue}
							onChange={(e) => {
								const onlyNumbers = e.target.value.replace(/\D/g, "");
								setDisplayValue(formatCurrencyInput(onlyNumbers));
								setValue("value", onlyNumbers ? Number(onlyNumbers) / 100 : 0);
							}}
							className={clsx(
								"h-[2.625rem] mt-[0.3125rem]",
								errors.value ? styles.input_field_error : styles.input_field,
							)}
						/>
						<span className="text-red-500 text-xs h-4 my-[0.125rem] mb-[0.125rem] block">
							{errors.value ? errors.value.message : null}
						</span>
					</>
				) : (
					<input
						type="text"
						id="income-value"
						placeholder="0.00"
						value={displayValue}
						onChange={(e) => {
							const onlyNumbers = e.target.value.replace(/\D/g, "");
							setDisplayValue(formatCurrencyInput(onlyNumbers));
							setValue("value", onlyNumbers ? Number(onlyNumbers) / 100 : 0);
						}}
						className={clsx("h-[2.625rem] mt-[0.3125rem] mb-[1.25rem]", styles.input_field)}
					/>
				)}
			</div>

			<div className="mb-4 w-full">
				<label
					className={`${styles.label_field} text-xs`}
					htmlFor="income-category"
				>
					Categoria
				</label>
				<select
					id="income-category"
					{...register("category")}
					className={clsx(styles.input_field, "h-[2.625rem] mt-[0.3125rem]")}
				>
					<option value="Salário">Salário</option>
					<option value="Investimentos">Investimentos</option>
					<option value="Freelance">Freelance</option>
					<option value="Outros">Outros</option>
				</select>
			</div>
			<CustomButton
				type="submit"
				title="Adicionar Receita"
				onClick={() => dispatch(openModal("authUser"))}
				isPrimary
				isLoading={isLoading}
				stylesButton="text-[0.8125rem] h-[2.375rem] line-height:20px bg-indigo-500 hover:bg-indigo-600"
				iconButton={MdAdd}
			/>
		</form>
	);
};

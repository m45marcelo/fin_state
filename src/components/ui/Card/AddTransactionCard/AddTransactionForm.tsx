"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";
import styles from "@/components/ui/Card/AddTransactionCard/InputBorderStyle.module.css";
import { formatCurrencyInput } from "@/utils/formatCurrency";

import { CustomButton } from "../../Button/CustomButton";
import { type CreateTransactionTypeSchema, createTransactionValidateSchema } from "@/validators/transaction/createTransactionValidateSchema";

interface AddTransactionFormProps {
	stateButton1: boolean;
	stateButton2: boolean;
}

export const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
	stateButton1,
	stateButton2,
}) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<CreateTransactionTypeSchema>({
		resolver: zodResolver(createTransactionValidateSchema) as any,
		defaultValues: {
			category: stateButton1 ? "Salário" : "Supermercado",
		},
	});

	const [displayValue, setDisplayValue] = useState("");

	useEffect(() => {
		reset({
			category: stateButton1 ? "Salário" : "Supermercado",
		});
		setDisplayValue("");
	}, [stateButton1, reset]);

	const onSubmit = (data: CreateTransactionTypeSchema) => {
		
		reset();
		setDisplayValue("");
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
			{stateButton1 && (
				<>
					<div className="w-full">
						<label className={`${styles.label_field} text-xs`} htmlFor="income-description">
							Descrição
						</label>
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
					</div>

					<div className="w-full">
						<label className={`${styles.label_field} text-xs`} htmlFor="income-value">
							Valor
						</label>
						<input
							type="text"
							id="income-value"
							placeholder="0.00"
							value={displayValue}
							onChange={(e) => {
								const onlyNumbers = e.target.value.replace(/\D/g, "");
								setDisplayValue(formatCurrencyInput(onlyNumbers));
								setValue("value", Number(onlyNumbers) / 100);
							}}
							className={clsx(
								"h-[2.625rem] mt-[0.3125rem]",
								errors.value ? styles.input_field_error : styles.input_field,
							)}
						/>
						<span className="text-red-500 text-xs h-4 my-[0.125rem] mb-[0.125rem] block">
							{errors.value ? errors.value.message : null}
						</span>
					</div>

					<div className="mb-4 w-full">
						<label className={`${styles.label_field} text-xs`} htmlFor="income-category">
							Categoria
						</label>
						<select
							id="income-category"
							{...register("category")}
							className={clsx(
								styles.input_field,
								"h-[2.625rem] mt-[0.3125rem]",
							)}
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
						isPrimary
						className="text-[0.8125rem] h-[2.375rem] line-height:20px bg-indigo-500 hover:bg-indigo-600"
						iconButton={MdAdd}
					/>
				</>
			)}

			{stateButton2 && (
				<>
					<div className="w-full">
						<label className={`${styles.label_field} text-xs`} htmlFor="income-description">
							Descrição
						</label>
						<input
							type="text"
							id="income-description"
							placeholder="Ex: Compras de supermercado"
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
					</div>

					<div className="w-full">
						<label className={`${styles.label_field} text-xs`} htmlFor="income-value">
							Valor
						</label>
						<input
							type="text"
							id="income-value"
							placeholder="0.00"
							value={displayValue}
							onChange={(e) => {
								const onlyNumbers = e.target.value.replace(/\D/g, "");
								setDisplayValue(formatCurrencyInput(onlyNumbers));
								setValue("value", Number(onlyNumbers) / 100);
							}}
							className={clsx(
								"h-[2.625rem] mt-[0.3125rem]",
								errors.value ? styles.input_field_error : styles.input_field,
							)}
						/>
						<span className="text-red-500 text-xs h-4 my-[0.125rem] mb-[0.125rem] block">
							{errors.value ? errors.value.message : null}
						</span>
					</div>

					<div className="mb-4 w-full">
						<label className={`${styles.label_field} text-xs`} htmlFor="expense-category">
							Categoria
						</label>
						<select
							id="expense-category"
							{...register("category")}
							className={clsx(
								styles.input_field,
								"h-[2.625rem] mt-[0.3125rem]",
							)}
						>
							<option value="Supermercado">Supermercado</option>
							<option value="Moradia">Moradia</option>
							<option value="Entretenimento">Entretenimento</option>
							<option value="Transporte">Transporte</option>
							<option value="Lazer">Lazer</option>
							<option value="Saúde">Saúde</option>
							<option value="Vestuário">Vestuário</option>
							<option value="Outros">Outros</option>
						</select>
					</div>
					<CustomButton
						type="submit"
						title="Adicionar Despesa"
						isPrimary
						className="text-[0.8125rem] h-[38px] line-height: 1.25rem bg-indigo-500 hover:bg-indigo-600"
						iconButton={MdAdd}
					/>
				</>
			)}
		</form>
	);
};

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdAdd } from "react-icons/md";
import styles from "@/components/ui/Card/AddTransactionCard/InputBorderStyle.module.css";
import { useAppDispatch } from "@/hooks";
import { expenseApi, useCreateExpenseMutation } from "@/store/api/expenseApi";
import { useGetMeQuery } from "@/store/api/userApi";
import { openModal } from "@/store/slices/modalSlice";
import { formatCurrencyInput } from "@/utils/formatCurrency";
import {
	type CreateExpenseTypeSchema,
	createExpenseValidateSchema,
} from "@/validators/expense/createExpenseValidateSchema";
import { CustomButton } from "../../Button/CustomButton";

export const AddExpenseForm = () => {
	const { data: userData } = useGetMeQuery();
	const dispatch = useAppDispatch();
	const [createExpense, { isLoading }] = useCreateExpenseMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm<CreateExpenseTypeSchema>({
		resolver: zodResolver(createExpenseValidateSchema) as any,
		defaultValues: {
			category: "Supermercado",
		},
	});

	const [displayValue, setDisplayValue] = useState("");

	useEffect(() => {
		reset({
			category: "Supermercado",
		});
		setDisplayValue("");
	}, [reset]);

	async function onSubmit(data: CreateExpenseTypeSchema) {
		setDisplayValue("");
		if (userData) {
			try {
				await createExpense(data).unwrap();
				dispatch(
					expenseApi.util.invalidateTags(["Transactions"])
				  );
				toast.success("Despesa criada com sucesso");
			} catch (err) {
				console.error("Erro ao tentar criar uma despesa", err);
				toast.error("Ocorreu um erro ao tentar criar uma nova despesa");
			}
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">
			<div className="w-full">
				<label
					className={`${styles.label_field} text-xs`}
					htmlFor="expense-description"
				>
					Descrição
				</label>
				{userData ? (
					<>
						<input
							type="text"
							id="expense-description"
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
					</>
				) : (
					<input
						type="text"
						id="income-description"
						placeholder="Ex: Compras de supermercado"
						className={clsx(
							"h-[2.625rem] mt-[0.3125rem] mb-[1.25rem]",
							styles.input_field,
						)}
					/>
				)}
			</div>

			<div className="w-full">
				<label
					className={`${styles.label_field} text-xs`}
					htmlFor="expense-value"
				>
					Valor
				</label>

				{
					userData ? (
						<>
							<input
					type="text"
					id="expense-value"
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
					): (
						<input
					type="text"
					id="expense-value"
					placeholder="0.00"
					value={displayValue}
					onChange={(e) => {
						const onlyNumbers = e.target.value.replace(/\D/g, "");
						setDisplayValue(formatCurrencyInput(onlyNumbers));
						setValue("value", onlyNumbers ? Number(onlyNumbers) / 100 : 0);
					}}
					className={clsx(
						"h-[2.625rem] mt-[0.3125rem] mb-[1.25rem]", styles.input_field,
					)}
				/>
					)
				}
			</div>

			<div className="mb-4 w-full">
				<label
					className={`${styles.label_field} text-xs`}
					htmlFor="expense-category"
				>
					Categoria
				</label>
				<select
					id="expense-category"
					{...register("category")}
					className={clsx(styles.input_field, "h-[2.625rem] mt-[0.3125rem]")}
				>
					<option value="Supermercado">Supermercado</option>
					<option value="Moradia">Moradia</option>
					<option value="Entretenimento">Entretenimento</option>
					<option value="Transporte">Transporte</option>
					<option value="Educação">Educação</option>
					<option value="Saúde">Saúde</option>
					<option value="Vestuário">Vestuário</option>
					<option value="Outros">Outros</option>
				</select>
			</div>
			{userData ? (
				<CustomButton
					type="submit"
					title="Adicionar Despesa"
					isLoading={isLoading}
					isPrimary
					stylesButton="text-[0.8125rem] h-[38px] line-height: 1.25rem bg-indigo-500 hover:bg-indigo-600"
					iconButton={MdAdd}
				/>
			) : (
				<CustomButton
					type="submit"
					onClick={() => dispatch(openModal("authUser"))}
					title="Adicionar Despesa"
					isLoading={isLoading}
					isPrimary
					stylesButton="text-[0.8125rem] h-[38px] line-height: 1.25rem bg-indigo-500 hover:bg-indigo-600"
					iconButton={MdAdd}
				/>
			)}
		</form>
	);
};

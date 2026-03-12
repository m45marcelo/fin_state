"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import styles from "@/components/ui/Card/AddTransactionCard/InputBorderStyle.module.css";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { closeModal } from "@/store/slices/modalSlice";
import { formatCurrencyInput, formatDateForInput } from "@/utils/formatCurrency";
import {
	type CreateSubscriptionTypeSchema,
	createSubscriptionValidateSchema,
} from "@/validators/subscription/createSubScriptionValidateSchema";
import { CustomButton } from "../../Button/CustomButton";
import { TitleCardH2 } from "../../TextComponents/TittleCardH2";
import { useUpdateSubscriptionMutation } from "@/store/api/subscriptionApi";
import { UpdateSubscriptionTypeSchema } from "@/validators/subscription/updateSubscriptionValidateSchema";
import toast from "react-hot-toast";

export const CardModalEditSubscription = () => {
	const [updateSubscription, { isLoading }] = useUpdateSubscriptionMutation()
	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<CreateSubscriptionTypeSchema>({
		resolver: zodResolver(createSubscriptionValidateSchema) as any,
	});

	const dispatch = useAppDispatch();
	const selectedSubscription = useAppSelector(
		(state) => state.selectedSubscription.subscription,
	);

	const [displayValue, setDisplayValue] = useState("");
	const [startDateDisplayValue, setStartDateDisplayValue] = useState("")
	const [nextPayDisplayValue, setNextPayDisplayValue] = useState("")

	useEffect(() => {
		if (selectedSubscription) {
			reset({
				description: selectedSubscription.description,
				value: selectedSubscription.value,
				category: selectedSubscription.category,
				startDate: selectedSubscription.startDate,
				frequency: selectedSubscription.frequency,
				nextPay: selectedSubscription.nextPay
			});
			setDisplayValue(formatCurrencyInput(String(selectedSubscription.value * 100)));
			setNextPayDisplayValue(formatDateForInput(selectedSubscription.nextPay));
			setStartDateDisplayValue(formatDateForInput(selectedSubscription.startDate));
		}
	}, [selectedSubscription, reset]);

	async function onSubmit(data: UpdateSubscriptionTypeSchema){
		if(selectedSubscription){
			const subscriptionData = {
				id: selectedSubscription.id,
				status: selectedSubscription.status,
				...data
			}

			try {
				await updateSubscription(subscriptionData).unwrap();
				toast.success("Transação editada com sucesso")

			} catch (err) {
				console.error("Ocorreu um erro ao tentar atualizar a assinatura", err);
				toast.error("Ocorreu um erro ao tentar editar essa transação")
			}
		}

		dispatch(closeModal());
		reset();
		if(selectedSubscription){
			setDisplayValue(formatCurrencyInput(String(selectedSubscription.value * 100)));
		}

		setValue("nextPay", new Date(nextPayDisplayValue));
		setValue("startDate", new Date(startDateDisplayValue));
	};

	if (!selectedSubscription) return null;

	return (
		<div className="h-[29.375rem] w-full max-w-[28.75rem] py-[1.375rem] px-[1.375rem] rounded-2xl bg-white">
			<div className="flex justify-between items-center text-center mb-[20px]">
				<TitleCardH2 className="font-semibold text-lg">
					Editar Assinatura
				</TitleCardH2>
				<button
					type="button"
					onClick={() => {
						dispatch(closeModal());
						setDisplayValue(formatCurrencyInput(String(selectedSubscription.value * 100)));
						reset();
					}}
					className="h-7 text-gray-400 hover:text-gray-600"
				>
					<MdClose className="text-2xl" />
				</button>
			</div>

			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
				{/* Descrição */}
				<div className="w-full">
					<label
						htmlFor="subscription-description"
						className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
					>
						Descrição
					</label>
					<input
						id="subscription-description"
						type="text"
						placeholder="Ex: Netflix, Aluguel"
						{...register("description")}
						className={clsx(
							"h-[2.625rem]",
							errors.description
								? styles.input_field_error
								: styles.input_field,
						)}
					/>
					<span className="text-red-500 text-xs h-4 block">
						{errors.description?.message}
					</span>
				</div>

				{/* Valor e Categoria */}
				<div className="flex gap-[0.875rem]">
					<div className="w-full max-w-[12.5625rem]">
						<label
							htmlFor="subscription-value"
							className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
						>
							Valor (R$)
						</label>
						<input
							id="subscription-value"
							type="text"
							placeholder="0.00"
							value={displayValue}
							onChange={(e) => {
								const onlyNumbers = e.target.value.replace(/\D/g, "");
								setDisplayValue(formatCurrencyInput(onlyNumbers));
								setValue("value", onlyNumbers ? Number(onlyNumbers) / 100 : 0);
							}}
							className={clsx(
								"h-[2.625rem]",
								errors.value ? styles.input_field_error : styles.input_field,
							)}
						/>
						<span className="text-red-500 text-xs h-4 block">
							{errors.value?.message}
						</span>
					</div>

					<div className="w-full max-w-[12.5625rem]">
						<label
							htmlFor="subscription-category"
							className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
						>
							Categoria
						</label>
						<select
							id="subscription-category"
							{...register("category")}
							className={`h-[2.625rem] ${styles.input_field}`}
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
				</div>

				{/* Datas e frequência */}
				<div className="w-full flex gap-[0.875rem]">
					<div className="w-full max-w-[12.5625rem]">
						<label
							htmlFor="subscription-start-date"
							className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
						>
							Data de início
						</label>
						<input
							type="date"
							id="subscription-start-date"
							value={startDateDisplayValue}
							onChange={(e) => {
								const dateChange = e.target.value;
								setStartDateDisplayValue(dateChange);
								setValue("startDate", new Date(dateChange));
							}}
							className={clsx(
								"h-[2.625rem]",
								errors.startDate
									? styles.input_field_error
									: styles.input_field,
							)}
						/>
						<span className="text-red-500 text-xs h-4 block">
							{errors.startDate?.message}
						</span>
					</div>

					<div className="w-full max-w-[12.5625rem]">
						<label
							htmlFor="subscription-frequency"
							className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
						>
							Frequência
						</label>
						<select
							id="subscription-frequency"
							{...register("frequency")}
							className={`h-[2.625rem] ${styles.input_field}`}
						>
							<option value="Mensal">Mensal</option>
							<option value="Semanal">Semanal</option>
						</select>
					</div>
				</div>

				{/* Próximo pagamento */}
				<div className="w-full mb-[0.625rem]">
					<label
						htmlFor="subscription-next-payment"
						className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
					>
						Próximo Pagamento
					</label>
					<input
						type="date"
						id="subscription-next-payment"
						value={nextPayDisplayValue}
						onChange={(e) => {
							const dateChange = e.target.value;
							setNextPayDisplayValue(dateChange);
							setValue("nextPay", new Date(dateChange))
						}}
						className={clsx(
							"h-[2.625rem]",
							errors.nextPay
								? styles.input_field_error
								: styles.input_field,
						)}
					/>
					<span className="text-red-500 text-xs h-4 block">
						{errors.nextPay?.message}
					</span>
				</div>

				{/* Botões */}
				<div className="flex justify-end gap-[0.625rem]">
					<CustomButton
						type="button"
						title="Cancelar"
						onClick={() => {
							dispatch(closeModal());
							reset();
						}}
						className="text-[0.9375rem] h-[2.375rem] bg-gray-200 hover:bg-gray-300 text-gray-800"
						isPrimary={false}
					/>
					<CustomButton
						type="submit"
						title="Salvar Alterações"
						className="text-[0.9375rem] h-[2.375rem] bg-indigo-500 hover:bg-indigo-600"
						isPrimary
					/>
				</div>
			</form>
		</div>
	);
};

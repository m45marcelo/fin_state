"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import styles from "@/components/ui/Card/AddTransactionCard/InputBorderStyle.module.css";
import { useAppDispatch } from "@/hooks";
import { closeModal } from "@/store/slices/modalSlice";
import { formatCurrencyInput } from "@/utils/formatCurrency";
import {
	type CreateSubscriptionTypeSchema,
	createSubscriptionValidateSchema,
} from "@/validators/subscription/createSubScriptionValidateSchema";
import { CustomButton } from "../../Button/CustomButton";
import { TitleCardH2 } from "../../TextComponents/TittleCardH2";
import { useCreateSubscriptionMutation } from "@/store/api/subscriptionApi";
import { CreatedSubscriptionData, CreatedSubscriptionFormData } from "@/domain/entities/Subscription";
import toast from "react-hot-toast";

export const CardModalAddSubscription = () => {
	const [createSubscription, { isLoading }] = useCreateSubscriptionMutation();
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

	const [displayValue, setDisplayValue] = useState("0,00");


	async function onSubmit(data: CreatedSubscriptionData){
		try {
			const formData = {
				...data,

				nextPay: new Date(data.nextPay)
			}
			await createSubscription(formData).unwrap();
			reset();
			setDisplayValue("0,00");
			
			dispatch(closeModal())
			toast.success("Despesa recorrente criada com sucesso")
		} catch (err) {
			console.log("Erro ao tentar criar uma despesa recorrente", err)
			toast.error("Ocorreu um erro ao tentar criar uma nova despesa recorrente")
		}
	};

	return (
		<div
			className="h-[30.75rem] w-full max-w-[28.75rem] py-[1.375rem] px-[1.375rem] rounded-2xl
		 bg-white"
		>
			<div className="flex justify-between items-center text-center mb-[1.25rem]">
				<TitleCardH2 className="font-semibold text-lg">
					Assinaturas E Despesas Recorrentes
				</TitleCardH2>
				<button
					type="button"
					onClick={() => {
						dispatch(closeModal());
						reset();
						setDisplayValue("0,00");
					}}
					className="h-7 text-gray-400 hover:text-gray-600"
				>
					<MdClose className="text-2xl" />
				</button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
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
							" h-[2.625rem]",
							errors.description
								? styles.input_field_error
								: styles.input_field,
						)}
					/>
					<span className="text-red-500 text-xs h-4 my-[0.125rem] mb-[0.125rem] block">
						{errors.description?.message ? errors.description?.message : null}
					</span>
				</div>
				<div className="flex gap-[0.875rem]">
					<div className="w-full max-w-[12.5625rem]">
						<label
							htmlFor="subscription-value"
							className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
						>
							Valor
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
								" h-[2.625rem]",
								errors.value ? styles.input_field_error : styles.input_field,
							)}
						/>
						<span className="text-red-500 text-xs h-4 my-[0.125rem] mb-[0.125rem] block">
							{errors.value?.message ? errors.value?.message : null}
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
				<div className="w-full flex gap-[0.875rem] ">
					<div className="w-full max-w-[12.5625rem]">
						<label
							htmlFor="subscription-start-date"
							className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
						>
							Data de inicio
						</label>
						<input
							type="date"
							id="subscription-start-date"
							{...register("startDate")}
							className={clsx(
								" h-[2.625rem]",
								errors.startDate
									? styles.input_field_error
									: styles.input_field,
							)}
						/>
						<span className="text-red-500 text-xs h-4 my-[0.125rem] mb-[0.125rem] block">
							{errors.startDate?.message ? errors.startDate?.message : null}
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
							<option>Mensal</option>
							<option>Semanal</option>
						</select>
					</div>
				</div>

				<div className="w-full mb-[20px]">
					<label
						htmlFor="subscription-next-payment"
						className={`${styles.label_field} text-[0.8125rem] mb-[0.25rem]`}
					>
						Próximo Pagamento
					</label>
					<input
						type="date"
						id="subscription-next-payment"
						{...register("nextPay")}
						className={clsx(
							" h-[2.625rem]",
							errors.nextPay
								? styles.input_field_error
								: styles.input_field,
						)}
					/>
					<span className="text-red-500 text-xs h-4 my-[0.125rem] mb-[0.125rem] block">
						{errors.nextPay?.message ? errors.nextPay?.message : null}
					</span>
				</div>

				<div className="flex justify-end gap-[0.625rem]">
					<CustomButton
						type="button"
						title="Cancelar"
						stylesButton="h-[2.375rem] text-[0.9375rem] bg-indigo-500 hover:bg-indigo-600"
						isPrimary={false}
						onClick={() => {
							dispatch(closeModal());
							reset();
						}}
					/>
					<CustomButton
						type="submit"
						isLoading={isLoading}
						title="Adicionar Assinatura"
						stylesButton="h-[2.375rem] text-[0.9375rem] bg-indigo-500 hover:bg-indigo-600"
						isPrimary
					/>
				</div>
			</form>
		</div>
	);
};

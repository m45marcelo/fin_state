"use client";
import { useState } from "react";
import styles from "@/components/ui/Card/AddTransactionCard/InputBorderStyle.module.css";
import { ButtonHistoryTransaction } from "../../Button/ButtonHistoryTransaction";
import { TitleCardH2 } from "../../TextComponents/TittleCardH2";
import { ButtonsContainer } from "../AddTransactionCard/ButtonsContainer";
import { TableHistoryTransaction } from "./TableHistoryTransactions";

import { MdSearch } from "react-icons/md";
import { useForm } from "react-hook-form";
import { SearchTransactionTypeSchema, searchTransactionValidateSchema } from "@/validators/transaction/searchTransactionValidateSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllExpensesQuery } from "@/store/api/expenseApi";

interface CardTableHistoryTransactionProps{
	lastButton: number | undefined;
}

export type SelectButtonType = "all" | "income" | "expense";

export const CardTableHistoryTransaction = ({lastButton}: CardTableHistoryTransactionProps) => {
	const {handleSubmit, register } = useForm<SearchTransactionTypeSchema>({
		resolver: zodResolver(searchTransactionValidateSchema)
	})

	const { isLoading } = useGetAllExpensesQuery()

	const [stateButton1, setStateButton1] = useState(true);
	const [stateButton2, setStateButton2] = useState(false);
	const [stateButton3, setStateButton3] = useState(false);
    const [lastButtonType, setLastButtonType] = useState<SelectButtonType>("all");
	const [inputContent, setInputContent] = useState<string>("");

	const updateStateButton1 = () => {
		setLastButtonType("all")
		setStateButton1(true);
		setStateButton2(false);
		setStateButton3(false);
		setInputContent("")
	};

	const updateStateButton2 = () => {
        setLastButtonType("income")
		setStateButton1(false);
		setStateButton2(true);
		setStateButton3(false);
		setInputContent("");
	};
	
	const updateStateButton3 = () => {
        setLastButtonType("expense")
		setStateButton1(false);
		setStateButton2(false);
		setStateButton3(true);
		setInputContent("");
	};

	function onSubmit(data: { description: string }) {
		setInputContent(data.description);
	}

	return (
		<div className="bg-white p-[1.3125rem] w-full max-w-[52.6875rem] h-fit max-h-[55.625rem] shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl">
			<div className="flex justify-between mb-[0.9375rem]">
				<TitleCardH2 className="text-base text-center">
					Historico de Transações
				</TitleCardH2>
				<form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
					<input
						type="search"
						placeholder="Buscar transações..."
						{...register("description")}
						className={`${styles.input_field} max-w-60 h-9`}
					/>
					<button type="submit" className="bg-primary h-9 w-10 flex justify-center items-center rounded-lg">
						<MdSearch color="white" size={20}/>
					</button>
				</form>
			</div>
			<ButtonsContainer stylesContainer="flex h-[2.6875rem] bg-gray-100 py-[0.1875rem] px-[0.25rem] mb-4 rounded-lg">
				<ButtonHistoryTransaction
					title="Todas"
					isActive={stateButton1}
					onClick={() => updateStateButton1()}
				/>
				<ButtonHistoryTransaction
					title="Receitas"
					isActive={stateButton2}
					onClick={() => updateStateButton2()}
				/>
				<ButtonHistoryTransaction
					title="Despesas"
					isActive={stateButton3}
					onClick={() => updateStateButton3()}
				/>
			</ButtonsContainer>

			<TableHistoryTransaction lastButton={lastButton} textInput={inputContent} type={lastButtonType} />
		</div>
	);
};

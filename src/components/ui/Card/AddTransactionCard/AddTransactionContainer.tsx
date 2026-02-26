"use client";
import { useState } from "react";
import { ButtonSelectAction } from "../../Button/ButtonSelectAction";
import { TitleCardH2 } from "../../TextComponents/TittleCardH2";
import { AddExpenseForm } from "./AddExpenseForm";
import { AddIncomeForm } from "./AddIncomeForm";
import { ButtonsContainer } from "./ButtonsContainer";

export const AddTransactionContainer = () => {
	const [stateButton1, setStateButton1] = useState(true);
	const [stateButton2, setStateButton2] = useState(false);

	const updateStateButton = () => {
		if (!stateButton1) {
			setStateButton1(true);
			setStateButton2(false);
		} else if (!stateButton2) {
			setStateButton2(true);
			setStateButton1(false);
		}
	};
	return (
		<div className="bg-white flex flex-col p-[1.3125rem] w-full max-w-[411px] h-full shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl">
			<TitleCardH2 className="mb-4 text-[1rem]">
				Adicionar Transações
			</TitleCardH2>
			<ButtonsContainer stylesContainer="flex h-[43px] bg-gray-100 py-[0.1875rem] px-[0.25rem] mb-4 rounded-lg">
				<ButtonSelectAction
					title="Receita"
					isActive={stateButton1}
					onClick={() => updateStateButton()}
				/>
				<ButtonSelectAction
					title="Despesa"
					isActive={stateButton2}
					onClick={() => updateStateButton()}
				/>
			</ButtonsContainer>
			{stateButton1 ? (
				<AddIncomeForm />
			) : (
				<AddExpenseForm />
			)}
		</div>
	);
};

"use client";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import { ButtonSelectDate } from "@/components/ui/Button/ButtonSelectDate";
import { CustomButton } from "@/components/ui/Button/CustomButton";
import { MultipleCalendar } from "@/components/ui/Calendar/Calendar";
import { CardTableHistoryTransaction } from "@/components/ui/Card/CardTableHistoryTransaction/CardTableHistoryTransaction";
import { ChartCard } from "@/components/ui/Card/Chartcard/ChartCard";
import { ExpenseChart } from "@/components/ui/Chart/ExpenseChart";
import { IncomeChart } from "@/components/ui/Chart/IncomeChart";

const Transacoes = () => {
	const [stateButton1, setStateButton1] = useState(false);
	const [stateButton2, setStateButton2] = useState(false);
	const [stateButton3, setStateButton3] = useState(false);
	const [stateButton4, setStateButton4] = useState(false);

	const [lastButton, setLastButton] = useState<number | undefined>(undefined);

	const handleStateButton1 = () => {
		setStateButton1(true);
		setStateButton2(false);
		setStateButton3(false);
		setStateButton4(false);
		setLastButton(1);
	};
	const handleStateButton2 = () => {
		setStateButton1(false);
		setStateButton2(true);
		setStateButton3(false);
		setStateButton4(false);
		setLastButton(2);
	};
	const handleStateButton3 = () => {
		setStateButton1(false);
		setStateButton2(false);
		setStateButton3(true);
		setStateButton4(false);
		setLastButton(3);
	};
	const handleStateButton4 = () => {
		setStateButton1(false);
		setStateButton2(false);
		setStateButton3(false);
		setStateButton4(true);
		setLastButton(4);
	};

	return (
		<div className="flex flex-col w-full  relative ">
			<MultipleCalendar closeCalendar={()=> setStateButton4(false)} className={stateButton4 ? "absolute z-10 w-[600px] left-[450px] bg-white border border-gray-300" : "absolute z-10 w-[600px] hidden left-[450px] bg-white border border-gray-300"}/>
			<div className="flex justify-between w-full mb-[1.3125rem]">
				<div className="flex gap-[0.4375rem] z-10">
					<ButtonSelectDate
						onClick={() => handleStateButton1()}
						isSelected={stateButton1}
						text="Mês Atual"
					/>
					<ButtonSelectDate
						onClick={() => handleStateButton2()}
						isSelected={stateButton2}
						text="Mês Anterior"
					/>
					<ButtonSelectDate
						onClick={() => handleStateButton3()}
						isSelected={stateButton3}
						text="Últimos 3 Meses"
					/>
					<ButtonSelectDate
						onClick={() => handleStateButton4()}
						isSelected={stateButton4}
						text="Personalisado"
					/>
					<div >
			</div>
				</div>

				<CustomButton
					stylesButton="bg-indigo-500 hover:bg-indigo-600 text-[0.9375rem]"
					isPrimary
					type="button"
					title="Nova Transição"
					iconButton={MdAdd}
				/>
			</div>
			<div className="flex w-full justify-between">
				<CardTableHistoryTransaction lastButton={lastButton} />
				<div className="flex flex-col gap-[1.375rem]">
					<ChartCard chart={<IncomeChart />} />
					<ChartCard chart={<ExpenseChart />} />
				</div>
			</div>
			
		</div>
	);
};

export default Transacoes;

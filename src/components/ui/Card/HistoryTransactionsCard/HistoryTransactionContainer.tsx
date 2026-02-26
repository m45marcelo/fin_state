"use client";
import Link from "next/link";
import { useGetAllExpensesQuery } from "@/store/api/expenseApi";
import { useGetAllIncomesQuery } from "@/store/api/incomeApi";
import { useGetAllSubscriptionsQuery } from "@/store/api/subscriptionApi";
import { CustomText } from "../../TextComponents/CustomText";
import { TitleCardH2 } from "../../TextComponents/TittleCardH2";
import { HistoryTransactionsList } from "./HistoryTransactionsList";
import { NotTransaction } from "./NotTransaction";
import { useGetMeQuery } from "@/store/api/userApi";
import { useAppDispatch } from "@/hooks";
import { openModal } from "@/store/slices/modalSlice";

export const HistoryTransactionsContainer = () => {
	const dispatch = useAppDispatch();
	const {data} = useGetMeQuery();
	const { data: incomeData } = useGetAllIncomesQuery();
	const { data: expenseData } = useGetAllExpensesQuery();
	const { data: subscriptionData } = useGetAllSubscriptionsQuery();

	if (incomeData && expenseData && subscriptionData) {
		return (
			<div className="bg-white flex flex-col w-full max-w-[79.9375rem]  mb-[21px] gap-[1.3125rem] p-[1.3125rem] justify-center shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl">
				<div className="flex justify-between">
					<TitleCardH2>Ultimas Transações</TitleCardH2>
					<Link href={"/transacoes"}>
						<CustomText className="text-indigo-600 text-xs font-semibold w-auto cursor-pointer">
							Ver Tudo
						</CustomText>
					</Link>
				</div>
				{incomeData.incomes.length <= 0 ||
				expenseData.expenses.length <= 0 ||
				subscriptionData.subscriptions.length <= 0 ? (
					<HistoryTransactionsList />
				) : (
					<NotTransaction />
				)}
			</div>
		);
	}

	return(
		<div className="bg-white flex flex-col w-full max-w-[79.9375rem] mb-[21px] gap-[1.3125rem] p-[1.3125rem] justify-center shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl">
				<div className="flex justify-between">
					<TitleCardH2>Ultimas Transações</TitleCardH2>
					{data ? (
					<Link href={"/transactions"}>
						<CustomText className="text-indigo-600 text-xs font-semibold w-auto cursor-pointer">
							Ver mais
						</CustomText>
					</Link>
				) : (
					<button
						onClick={() => dispatch(openModal("authUser"))}
						type="button"
						className="text-indigo-600 text-xs font-semibold w-auto cursor-pointer"
					>
						Ver mais
					</button>
				)}
				</div>
					<NotTransaction />
			</div>
	)
};

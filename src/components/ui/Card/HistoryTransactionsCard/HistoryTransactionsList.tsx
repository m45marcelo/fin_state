"use client";
import { useMemo } from "react";
import Skeleton from "react-loading-skeleton";
import type { Expense } from "@/domain/entities/Expense";
import type { Income } from "@/domain/entities/Income";
import type { Subscription } from "@/domain/entities/Subscription";
import { useGetAllExpensesQuery } from "@/store/api/expenseApi";
import { useGetAllIncomesQuery } from "@/store/api/incomeApi";
import { useGetAllSubscriptionsQuery } from "@/store/api/subscriptionApi";
import { HistoryTransactionItemList } from "./HistoryTransactionItemList";

export const HistoryTransactionsList = () => {
	const { data: incomeData, isLoading: incomeLoading } =
		useGetAllIncomesQuery();
	const { data: expenseData, isLoading: expenseLoading } =
		useGetAllExpensesQuery();
	const { data: subscriptionData, isLoading: subscriptionLoading } =
		useGetAllSubscriptionsQuery();

	const incomes: Income[] = incomeData?.incomes ?? [];
	const expenses: Expense[] = expenseData?.expenses ?? [];
	const subscriptions: Subscription[] = subscriptionData ? subscriptionData.subscriptions.filter((item) => item.status === "Pago") : [];

	const isLoading = incomeLoading || expenseLoading || subscriptionLoading;

	const allTransactions: any[] = useMemo(() => {
		return [
			...incomes.map((item) => ({ ...item, type: "income" })),
			...expenses.map((item) => ({ ...item, type: "expense" })),
			...subscriptions.map((item) => ({ ...item, type: "subscription" })),
		]
			.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			)
			.slice(0, 6)
			.map((item, index) => ({ ...item, position: index + 1 }));
	}, [incomes, expenses, subscriptions]);

	return (
		<ul className="min-h-[11.25rem] flex flex-col gap-[0.6875rem]">
			{isLoading
				? [1, 2, 3, 4, 5, 6].map((item) => (
						<Skeleton key={item} height={63} width="100%" />
					))
				: allTransactions.map((tr) => (
						<HistoryTransactionItemList
							key={tr.id}
							description={tr.description}
							type={tr.type}
							category={tr.category}
							date={tr.createdAt}
							value={tr.value}
						/>
					))}
		</ul>
	);
};

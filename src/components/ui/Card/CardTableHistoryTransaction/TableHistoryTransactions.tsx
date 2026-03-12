"use client";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import type { TransactionsTypes } from "@/domain/entities/Transaction";
import { useGetExpenseByNameQuery } from "@/store/api/expenseApi";
import { useGetIncomeByNameQuery } from "@/store/api/incomeApi";
import {
	useGetAllTransactionByDateQuery,
	useGetAllTransactionsByTypeAndDateQuery,
	useGetAllTransactionsByTypeQuery,
	useGetAllTransactionsQuery,
	useGetTransactionByNameQuery,
} from "@/store/api/transactionApi";
import { selectDate } from "@/utils/selectDate";
import { NotTransaction } from "../HistoryTransactionsCard/NotTransaction";
import type { SelectButtonType } from "./CardTableHistoryTransaction";
import { HistoryItem } from "./HistoryItem";
import { PaginationHistory } from "./PaginationHistory";

interface TableHistoryTransactionProps {
	textInput: string;
	type: SelectButtonType;
	lastButton: number | undefined;
}

export const TableHistoryTransaction = ({
	textInput,
	type,
	lastButton,
}: TableHistoryTransactionProps) => {
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetAllTransactionsQuery({
		page: page,
		limit: 10,
	});
	const [transactionsPage, setTransactionsPage] = useState<any>(undefined);
	let typeTransaction: TransactionsTypes = "expense";

	if (type === "all") {
		typeTransaction = "income";
	} else {
		typeTransaction = type;
	}

	const { data: incomeOurExpense } = useGetAllTransactionsByTypeQuery({
		type: typeTransaction,
		page: page,
		limit: 10,
	});

	const { data: transactionsByName } = useGetTransactionByNameQuery({
		description: textInput,
		page: page,
		limit: 10,
	});

	const { data: incomesByName } = useGetIncomeByNameQuery({
		description: textInput,
		page: page,
		limit: 10,
	});

	console.log("pesquisa", incomesByName);

	const { data: expensesByName } = useGetExpenseByNameQuery({
		description: textInput,
		page: page,
		limit: 10,
	});

	const { data: transactionDate } = useGetAllTransactionByDateQuery({
		page: page,
		limit: 10,
		startDate: selectDate(lastButton).startDate,
		endDate: selectDate(lastButton).endDate,
	});

	const { data: transactionTypeAndDate } =
		useGetAllTransactionsByTypeAndDateQuery({
			type: typeTransaction,
			page: page,
			limit: 10,
			startDate: selectDate(lastButton).startDate,
			endDate: selectDate(lastButton).endDate,
		});

	const handleChangePage = (page: number) => {
		if (data) {
			if (page < 1 || page > data.pagination.totalPages) return;
			setPage(page);
		} else return;
	};

	const seeAllTransactionsOnly =
		type === "all" && !lastButton && textInput.length <= 0;

	const seeAllIncomesOnly =
		type === "income" && !lastButton && textInput.length <= 0;

	const seeAllExpensesOnly =
		type === "expense" && !lastButton && textInput.length <= 0;

	const seeAllTransactionsOnlyByName =
		type === "all" && !lastButton && textInput.length >= 1;

	const seeAllIncomesOnlyByName =
		type === "income" && !lastButton && textInput.length >= 1;

	const seeAllExpensesOnlyByName =
		type === "expense" && !lastButton && textInput.length >= 1;

	if (isLoading) {
		return (
			<>
				<table className="w-full max-w-[52.6875rem] border-collapse">
					<thead>
						<tr>
							<th className="w-full max-w-28 text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-left text-gray-800">
								DESCRIÇÃO
							</th>
							<th className="text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-left text-gray-800">
								CATEGORIA
							</th>
							<th className="text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-right text-gray-800">
								VALOR
							</th>
							<th className="text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-right text-gray-800">
								AÇÕES
							</th>
						</tr>
					</thead>
				</table>
				{isLoading &&
					[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
						<div key={item} className="w-full">
							<Skeleton height={66} width={"100%"} />
						</div>
					))}
			</>
		);
	}

	if (data) {
		if (data.transactions.length <= 0) {
			return (
				<>
					<table className="w-full max-w-[52.6875rem] border-collapse">
						<thead>
							<tr>
								<th className="w-full max-w-28 text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-left text-gray-800">
									DESCRIÇÃO
								</th>
								<th className="text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-left text-gray-800">
									CATEGORIA
								</th>
								<th className="text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-right text-gray-800">
									VALOR
								</th>
								<th className="text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-right text-gray-800">
									AÇÕES
								</th>
							</tr>
						</thead>
					</table>
					<NotTransaction />
				</>
			);
		}
	}

	return (
		<>
			<table className="w-full max-w-[52.6875rem] border-collapse">
				<thead>
					<tr>
						<th className="w-full max-w-28 text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-left text-gray-800">
							DESCRIÇÃO
						</th>
						<th className="text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-left text-gray-800">
							CATEGORIA
						</th>
						<th className="text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-right text-gray-800">
							VALOR
						</th>
						<th className="text-[0.6875rem] px-[1.375rem] py-[0.625rem] font-bold text-right text-gray-800">
							AÇÕES
						</th>
					</tr>
				</thead>
				<tbody>
					{seeAllTransactionsOnly &&
						data?.transactions.map((item) => (
							<HistoryItem
								key={item.id}
								description={item.description}
								type={item.type}
								category={item.category}
								date={item.createdAt}
								value={item.value}
							/>
						))}
					{seeAllIncomesOnly &&
						incomeOurExpense?.transactions.map((item) => (
							<HistoryItem
								key={item.id}
								description={item.description}
								type={item.type}
								category={item.category}
								date={item.createdAt}
								value={item.value}
							/>
						))}
					{seeAllExpensesOnly &&
						incomeOurExpense?.transactions.map((item) => (
							<HistoryItem
								key={item.id}
								description={item.description}
								type={item.type}
								category={item.category}
								date={item.createdAt}
								value={item.value}
							/>
						))}
					{seeAllTransactionsOnlyByName &&
						transactionsByName?.transactions.map((item) => (
							<HistoryItem
								key={item.id}
								description={item.description}
								type={item.type}
								category={item.category}
								date={item.createdAt}
								value={item.value}
							/>
						))}
					{seeAllIncomesOnlyByName &&
						incomesByName?.incomes.map((item) => (
							<HistoryItem
								key={item.id}
								description={item.description}
								type={item.type}
								category={item.category}
								date={item.createdAt}
								value={item.value}
							/>
						))}
					{seeAllExpensesOnlyByName &&
						expensesByName?.expenses.map((item) => (
							<HistoryItem
								key={item.id}
								description={item.description}
								type={item.type}
								category={item.category}
								date={item.createdAt}
								value={item.value}
							/>
						))}
				</tbody>
			</table>

			<div className="bg-white flex items-center w-full h-[3.75rem]">
				{data && seeAllTransactionsOnly && (
					<PaginationHistory
						itemsPerPage={data.pagination.itemsPerPage}
						totalItems={data.pagination.totalItems}
						changePage={handleChangePage}
						currentPage={data.pagination.currentPage}
						totalPages={data.pagination.totalPages}
					/>
				)}
				{incomeOurExpense && seeAllIncomesOnly && (
					<PaginationHistory
						itemsPerPage={incomeOurExpense.pagination.itemsPerPage}
						totalItems={incomeOurExpense.pagination.totalItems}
						changePage={handleChangePage}
						currentPage={incomeOurExpense.pagination.currentPage}
						totalPages={incomeOurExpense.pagination.totalPages}
					/>
				)}
				{incomeOurExpense && seeAllExpensesOnly && (
					<PaginationHistory
						itemsPerPage={incomeOurExpense.pagination.itemsPerPage}
						totalItems={incomeOurExpense.pagination.totalItems}
						changePage={handleChangePage}
						currentPage={incomeOurExpense.pagination.currentPage}
						totalPages={incomeOurExpense.pagination.totalPages}
					/>
				)}
				{transactionsByName && seeAllTransactionsOnlyByName && (
					<PaginationHistory
						itemsPerPage={transactionsByName.pagination.itemsPerPage}
						totalItems={transactionsByName.pagination.totalItems}
						changePage={handleChangePage}
						currentPage={transactionsByName.pagination.currentPage}
						totalPages={transactionsByName.pagination.totalPages}
					/>
				)}
				{incomesByName && seeAllIncomesOnlyByName && (
					<PaginationHistory
						itemsPerPage={incomesByName.pagination.itemsPerPage}
						totalItems={incomesByName.pagination.totalItems}
						changePage={handleChangePage}
						currentPage={incomesByName.pagination.currentPage}
						totalPages={incomesByName.pagination.totalPages}
					/>
				)}
				{expensesByName && seeAllExpensesOnlyByName && (
					<PaginationHistory
						itemsPerPage={expensesByName.pagination.itemsPerPage}
						totalItems={expensesByName.pagination.totalItems}
						changePage={handleChangePage}
						currentPage={expensesByName.pagination.currentPage}
						totalPages={expensesByName.pagination.totalPages}
					/>
				)}
			</div>
		</>
	);
};

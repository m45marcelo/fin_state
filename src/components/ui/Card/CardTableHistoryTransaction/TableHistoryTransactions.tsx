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
	console.log(lastButton);
	const [page, setPage] = useState(1);
	const { data, isLoading } = useGetAllTransactionsQuery({
		page: page,
		limit: 10,
	});
	const [transactionsPage, setTransactionsPage] = useState<any>(undefined);
	let typeTransaction: TransactionsTypes = "expense";

	if(type === "all"){
		typeTransaction = "income"
	}else{
		typeTransaction = type
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

	const { data: transactionsIncome } = useGetIncomeByNameQuery({
		description: textInput,
		page: page,
		limit: 10,
	});

	const { data: transactionsExpense } = useGetExpenseByNameQuery({
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

	const seeAllTransactions =
		type === "all" && !lastButton && textInput.length <= 0;

	const seeAllIncomes =
		type === "income" && !lastButton && textInput.length <= 0;

	const seeAllExpenses =
		type === "expense" && !lastButton && textInput.length <= 0;

	const seeAllTransactionsByName =
		type === "all" && !lastButton && textInput.length >= 1;

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
					{isLoading &&
						[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
							<tr key={item}>
								<td>
									<div className="w-full">
										<Skeleton height={66} width={"100%"} />
									</div>
								</td>
							</tr>
						))}

					{/* {seeAllTransactions &&
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
						{seeAllIncomes &&
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
						{seeAllExpenses &&
						incomeOurExpense?.transactions.map((item) => (
							<HistoryItem
								key={item.id}
								description={item.description}
								type={item.type}
								category={item.category}
								date={item.createdAt}
								value={item.value}
							/>
						))} */}
						{seeAllTransactionsByName &&
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
				</tbody>
			</table>
			<div className="bg-white flex items-center w-full h-[3.75rem]">
				{data && seeAllTransactions && (
					<PaginationHistory
						itemsPerPage={data.pagination.itemsPerPage}
						totalItems={data.pagination.totalItems}
						changePage={handleChangePage}
						currentPage={data.pagination.currentPage}
						totalPages={data.pagination.totalPages}
					/>
				)}
				{incomeOurExpense && seeAllIncomes &&(
					<PaginationHistory
						itemsPerPage={incomeOurExpense.pagination.itemsPerPage}
						totalItems={incomeOurExpense.pagination.totalItems}
						changePage={handleChangePage}
						currentPage={incomeOurExpense.pagination.currentPage}
						totalPages={incomeOurExpense.pagination.totalPages}
					/>
				)}
				{incomeOurExpense && seeAllExpenses &&(
					<PaginationHistory
						itemsPerPage={incomeOurExpense.pagination.itemsPerPage}
						totalItems={incomeOurExpense.pagination.totalItems}
						changePage={handleChangePage}
						currentPage={incomeOurExpense.pagination.currentPage}
						totalPages={incomeOurExpense.pagination.totalPages}
					/>
				)}
				{seeAllTransactionsByName && transactionsByName &&(
					<PaginationHistory
						itemsPerPage={transactionsByName.pagination.itemsPerPage}
						totalItems={transactionsByName.pagination.totalItems}
						changePage={handleChangePage}
						currentPage={transactionsByName.pagination.currentPage}
						totalPages={transactionsByName.pagination.totalPages}
					/>
				)}
			</div>
		</>
	);
};

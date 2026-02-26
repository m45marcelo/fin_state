"use client"
import {
    MdAccountBalanceWallet,
    MdAttachMoney,
    MdReceipt,
} from "react-icons/md";
import { CardInfo } from "./CardInfo";
import { useGetAllIncomesQuery } from "@/store/api/incomeApi";
import { useGetAllExpensesQuery } from "@/store/api/expenseApi";
import { useGetAllSubscriptionsQuery } from "@/store/api/subscriptionApi";
import { useGetAllTransactionsByTypeQuery } from "@/store/api/transactionApi";

export const CardInfoWrapper = () => {
    const {data: totalIncomes, isLoading } = useGetAllIncomesQuery();
    const { data: totalExpense} = useGetAllTransactionsByTypeQuery({
        type: "expense"
    })

    let currentBalance = (totalIncomes && totalExpense) ? totalIncomes.total - totalExpense.summary.totalExpenses : 0;

    const infoCards = [
        {
            title: "Saldo Atual",
            value: currentBalance,
            icon: MdAttachMoney,
            textColor: "text-gray-800",
            iconColor: "#1f2937",
        },
        {
            title: "Receitas Totais",
            value: totalIncomes?.total,
            icon: MdAccountBalanceWallet,
            textColor: "text-green-700",
            iconColor: "#16a34a",
        },
        {
            title: "Despesas Totais",
            value: totalExpense?.summary.totalExpenses,
            icon: MdReceipt,
            textColor: "text-red-700",
            iconColor: "#ef4444",
        },
    ];

    return (
        <div className="w-full grid grid-cols-3 gap-[22px] ">
            {
                infoCards.map((item) => {
                    return (
                        <CardInfo
                            key={item.title}
                            title={item.title}
                            value={item.value}
                            icon={item.icon}
                            textColor={item.textColor}
                            iconColor={item.iconColor}
                            isLoading={isLoading}
                        />
                    );
                }) 
            }
        </div>
    );
};

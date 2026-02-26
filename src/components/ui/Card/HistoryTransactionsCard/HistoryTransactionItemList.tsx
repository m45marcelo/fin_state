import clsx from "clsx";
import type { JSX } from "react";
import { MdArrowDownward, MdArrowUpward } from "react-icons/md";
import { formatCurrency } from "@/utils/formatCurrency";
import { CustomText } from "../../TextComponents/CustomText";

interface HistoryTransactionItemListProps {
	description: string;
	type: "expense" | "income" | "subscription";
	category: string;
	date: Date;
	value: number;
}

export const HistoryTransactionItemList: React.FC<
	HistoryTransactionItemListProps
> = ({ description, type, category, date, value }) => {
	let ItemIcom: JSX.Element | null = null;
	if (type === "income")
		ItemIcom = <MdArrowUpward size={20} className="text-green-600" />;
	if (type === "expense" || type === "subscription")
		ItemIcom = <MdArrowDownward size={20} className="text-red-600" />;
	return (
		<li
			className={clsx(
				"h-[3.9375rem] p-3 w-full flex items-center justify-between rounded-lg",
				{
					"bg-red-50": type === "expense" || type === "subscription",
					"bg-green-50": type === "income",
				},
			)}
		>
			<div className="flex">
				<div
					className={clsx(
						" w-[2.1875rem] h-[2.5625rem] rounded-full flex items-center justify-center mr-3",
						{
							"bg-red-100": type === "expense" || type === "subscription",
							"bg-green-100": type === "income",
						},
					)}
				>
					{ItemIcom}
				</div>
				<div className="w-[23.125rem] flex flex-col">
					<CustomText className="font-medium text-gray-700">
						{description}
					</CustomText>
					<div className="flex">
						<CustomText className="text-gray-700 font-normal text-[0.6875rem]">
							{`${category} | ${new Date(date).toLocaleDateString("pt-BR")}`}
						</CustomText>
					</div>
				</div>
			</div>
			<div>
				{type === "income" && (
					<CustomText className="text-sm font-medium text-green-600">{`+${formatCurrency(value)}`}</CustomText>
				)}
				{(type === "expense" || type === "subscription") && (
					<CustomText className="text-sm font-medium text-red-600">{`-${formatCurrency(value)}`}</CustomText>
				)}
			</div>
		</li>
	);
};

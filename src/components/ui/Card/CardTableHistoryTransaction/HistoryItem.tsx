import { MdDelete, MdEdit } from "react-icons/md";
import { CustomText } from "../../TextComponents/CustomText";
import { TransactionsTypes } from "@/domain/entities/Transaction";
import { IncomeCategory } from "@/domain/entities/Income";
import { ExpenseCategory } from "@/domain/entities/Expense";
import { formatCurrency } from "@/utils/formatCurrency";

interface HistoryItemProps{
    description: string;
    date: Date;
    category: IncomeCategory | ExpenseCategory;
    type: TransactionsTypes;
    value: number;
}

export const HistoryItem = ({description, date, category, type, value}: HistoryItemProps) => {
	
	return (
		<tr className="h-[4.125rem]">
			<td className="px-[1.375rem]  h-[3.9375rem]">
				<div className="flex flex-col">
					<CustomText className="text-xs font-medium">{description}</CustomText>
					<CustomText className="text-[11px] text-gray-500 font-normal">
						{new Date(date).toLocaleDateString("pt-BR")}
					</CustomText>
				</div>
			</td>
			<td className="px-[1.375rem] h-[3.9375rem]">
                {
                    type === "income" && (
                        <CustomText className="h-[1.4375rem] w-full px-3 flex justify-center items-center bg-green-100 rounded-xl text-[0.8125rem] font-medium text-green-600 ">
					        {category}
				        </CustomText>
                    )
                }
				{
                    (type === "expense" || type === "subscription") && (
                        <CustomText className="h-[1.4375rem] w-full px-3 flex justify-center items-center bg-blue-100 rounded-xl text-[0.8125rem] font-medium text-blue-600 ">
					        {category}
				        </CustomText>
                    )
                }
			</td>
			<td className="px-[1.375rem] h-[3.9375rem] text-right">
                {
                    type === "income" && (
                        <CustomText className="text-[0.8125rem] text-green-600 font-medium">
					        {formatCurrency(value)}
                        </CustomText>
                    )
                }
				{
                    (type === "expense" || type === "subscription") && (
                        <CustomText className="text-[0.8125rem] text-red-600 font-medium">
					        {formatCurrency(value)}
                        </CustomText>
                    )
                }
			</td>
			<td className="px-[1.375rem] h-[3.9375rem]">
				<div className="flex justify-end gap-3">
					<button type="button" className="text-gray-400  hover:text-gray-600">
						<MdEdit size={18} />
					</button>

					<button type="button" className="text-gray-400  hover:text-red-600">
						<MdDelete size={18} />
					</button>
				</div>
			</td>
		</tr>
	);
};

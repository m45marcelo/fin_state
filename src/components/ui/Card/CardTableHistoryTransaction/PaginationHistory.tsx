import clsx from "clsx";
import { v4 as uuidv4 } from "uuid";
import { CustomText } from "../../TextComponents/CustomText";

interface PaginationHistoryProps {
	itemsPerPage: number;
	totalItems: number;
	currentPage: number;
	totalPages: number;
	changePage: (page: number) => void;
}

export const PaginationHistory = ({
	itemsPerPage,
	totalItems,
	currentPage,
	totalPages,
	changePage,
}: PaginationHistoryProps) => {
	return (
		<div className="flex justify-between items-center w-full">
				<CustomText className="text-xs text-gray-600 font-medium">
					Mostrando 1 a {itemsPerPage} de{" "}
					{totalItems} transações
				</CustomText>
			<div className="flex">
				<button
					onClick={() => changePage(currentPage - 1)}
					type="button"
					className="h-[1.8125rem] text-sm px-[0.625rem] mr-[0.4375rem] flex items-center font-medium justify-center rounded-lg bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
				>
					Anterior
				</button>
				<div className="flex gap-[0.1875rem]">
					{Array.from({ length: totalPages }).map((_, index) => (
						<button
							key={uuidv4()}
							onClick={() => changePage(index + 1)}
							type="button"
							className={clsx(
								"h-[1.8125rem] text-sm w-[1.8125rem] flex items-center font-semibold justify-center rounded-lg",
								{
									"bg-primary text-white": currentPage === index + 1,
								},
								{
									"bg-white text-gray-600 border border-gray-300 hover:bg-gray-50":
										currentPage !== index + 1,
								},
							)}
						>
							{index + 1}
						</button>
					))}
				</div>
				<button
					onClick={() => changePage(currentPage + 1)}
					type="button"
					className="h-[1.8125rem] text-sm px-[0.625rem] ml-[0.4375rem] flex items-center font-medium justify-center rounded-lg bg-white text-gray-600 border border-gray-300 hover:bg-gray-50"
				>
					Próximo
				</button>
			</div>
		</div>
	);
};

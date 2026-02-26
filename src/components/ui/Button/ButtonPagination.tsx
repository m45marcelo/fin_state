import clsx from "clsx";

interface ButtonPaginationProps{
    currentPage: number;
    pageNumber: number;
}

export const ButtonPagination = ({ currentPage, pageNumber }: ButtonPaginationProps) => {
    return(
        <button type="button" className={clsx(
            "h-[1.8125rem] text-sm w-[1.8125rem] flex items-center font-semibold justify-center rounded-lg",
            {
                "bg-primary text-white" : currentPage === pageNumber
            },
            {
                "bg-white text-gray-600 border border-gray-300 hover:bg-gray-50": currentPage !== pageNumber
            }
        )}>
            {pageNumber}
        </button>
    )
}
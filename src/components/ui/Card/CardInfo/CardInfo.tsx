"use client";
import clsx from "clsx";
import type { IconType } from "react-icons";
import Skeleton from "react-loading-skeleton";
import { useGetMeQuery } from "@/store/api/userApi";
import { formatCurrency } from "@/utils/formatCurrency";

interface CardInfoProps {
	title: string;
	value: number | undefined;
	icon: IconType;
	textColor: string;
	iconColor: string;
	isLoading: boolean;
}

export const CardInfo: React.FC<CardInfoProps> = ({
	value,
	title,
	icon,
	textColor,
	iconColor,
	isLoading,
}) => {
	const { data } = useGetMeQuery();
	const ItemIcon = icon;

	return (
		<>
			{isLoading ? (
				<div className="bg-white p-[1.375rem] h-[6.0625rem] shadow rounded-2xl">
					<Skeleton height={13} width="100%" className="mb-2" />
					<Skeleton height={28} width="100%" />
				</div>
			) : (
				<div className="bg-white p-[1.375rem] h-[6.0625rem] shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl">
					<header className="flex w-full justify-between items-center mb-[0.125rem] ">
						<span className={clsx("text-[0.8125rem] font-medium", textColor)}>
							{title}
						</span>
						<ItemIcon size={22} color={iconColor} />
					</header>
					<span className={clsx("text-text-value-card font-medium", textColor)}>
						{data ? formatCurrency(value) : "R$ --,--"}
					</span>
				</div>
			)}
		</>
	);
};

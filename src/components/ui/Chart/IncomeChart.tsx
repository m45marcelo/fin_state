"use client";

import { Pie } from "react-chartjs-2";
import { useGetDashboardQuery } from "@/store/api/dashboardApi";
import { ChartLegend } from "./ChartLegend";

export const IncomeChart = () => {
	const { data: incomes } = useGetDashboardQuery();
	const labels = ["Salário", "Investimentos", "Freelancer", "Outros"];

	if (incomes) {
		const values = [
			incomes.incomes.categories[0].total,
			incomes.incomes.categories[1].total,
			incomes.incomes.categories[2].total,
			incomes.incomes.categories[3].total,
		];

        const percentages = [
			incomes.incomes.categories[0].percentage,
			incomes.incomes.categories[1].percentage,
			incomes.incomes.categories[2].percentage,
			incomes.incomes.categories[3].percentage,
		];

		const colors = ["#22c55e", "#84cc16", "#34d399", "#06b6d4"];

		const data = {
			labels,
			datasets: [
				{
					data: values,
					backgroundColor: colors,
					borderColor: "#fff",
					borderWidth: 2,
				},
			],
		};

		const legendItems = labels.map((label, index) => ({
			label,
            percentages: percentages[index],
			value: values[index],
			color: colors[index],
		}));

		return (
			<div className="w-full flex flex-col items-center justify-center mt-3">
				<div className="max-w-[14.25rem]">
					<Pie
						data={data}
						options={{
							plugins: {
								legend: { display: false },
							},
						}}
					/>
				</div>
                <div className="flex w-full justify-start">
                    <ChartLegend items={legendItems}/>
                </div>
			</div>
		);
	}
};

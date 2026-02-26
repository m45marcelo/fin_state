"use client";

import { Pie } from "react-chartjs-2";
import { useGetDashboardQuery } from "@/store/api/dashboardApi";
import { ChartLegend } from "./ChartLegend";

export const ExpenseChart = () => {
	const { data: expense } = useGetDashboardQuery();
	const labels = [
		"Supermercado",
		"Moradia",
        "Entretenimento",
        "Transporte",
		"Educação",
		"Saúde",
		"Vestuário",
		"Outros",
	];

	if (expense) {
		const values = [
			expense.expenses.categories[0].total,
			expense.expenses.categories[1].total,
			expense.expenses.categories[2].total,
			expense.expenses.categories[3].total,
            expense.expenses.categories[4].total,
            expense.expenses.categories[5].total,
            expense.expenses.categories[6].total,
            expense.expenses.categories[7].total,
		];

        const percentages = [
            expense.expenses.categories[0].percentage,
			expense.expenses.categories[1].percentage,
			expense.expenses.categories[2].percentage,
			expense.expenses.categories[3].percentage,
            expense.expenses.categories[4].percentage,
            expense.expenses.categories[5].percentage,
            expense.expenses.categories[6].percentage,
            expense.expenses.categories[7].percentage,
        ]
		const colors = [
			"#4ade80",
			"#60a5fa",
			"#facc15",
			"#f87171",
			"#c084fc",
			"#fb923c",
			"#2dd4bf",
			"#e879f9",
		];

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

		const legendItems = expense.expenses.categories.map((item, index) => ({
			label: labels[index],
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
					<ChartLegend items={legendItems} />
				</div>
			</div>
		);
	}
};

"use client";

import { useEffect, useRef } from "react";
import { Calendar } from "vanilla-calendar-pro";
import "vanilla-calendar-pro/styles/index.css";
import { useAppDispatch } from "@/hooks";
import { selectedDate } from "@/store/slices/selectedDateSlice";
import { CustomButton } from "../Button/CustomButton";

interface MultipleCalendarProps {
	className: string;
	closeCalendar: () => void;
}

export function MultipleCalendar({
	className,
	closeCalendar,
}: MultipleCalendarProps) {
	const calendarRef = useRef<HTMLDivElement>(null);
	const calendarInstance = useRef<Calendar | null>(null);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!calendarRef.current) return;

		const cal = new Calendar(calendarRef.current, {
			type: "multiple",
			selectionDatesMode: "multiple-ranged",
			displayMonthsCount: 2,
			locale: "pt-BR",
			selectedTheme: "light",
		});

		cal.init();
		calendarInstance.current = cal;

		return () => {
			cal.destroy();
			calendarInstance.current = null;
		};
	}, []);

	function handleApply() {
		const cal = calendarInstance.current;
		if (!cal) return;

		const raw = cal.context.selectedDates;

		if (!raw || raw.length === 0) {
			return;
		}

		const dates = raw.map((d) => String(d));

		dispatch(selectedDate(dates));
	}

	return (
		<div className={className}>
			<div ref={calendarRef} className=" bg-white  min-h-[300px]" />

			<div className="flex w-full justify-end border-t border-t-gray-300">
				<div className="flex mt-2 mr-2 mb-2 gap-2">
					<CustomButton
						type="button"
						onClick={closeCalendar}
						className="px-1 py-1 text-[0.875rem]"
						isPrimary={false}
						title="Cancelar"
					/>
					<CustomButton
						type="button"
						onClick={handleApply}
						className=" px-1 py-1 text-[0.875rem] bg-primary"
						isPrimary
						title="Aplicar"
					/>
				</div>
			</div>
		</div>
	);
}

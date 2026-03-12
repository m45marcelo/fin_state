import clsx from "clsx";
import type { MouseEventHandler } from "react";
import type { IconType } from "react-icons";
import { MoonLoader } from "react-spinners";
import styles from "@/components/ui/Button/CustomButton.module.css";

interface CustomButtonProps {
	type: "button" | "submit" | "reset" | undefined;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	title: string;
	isPrimary: boolean;
 	className?: string;
	iconButton?: IconType;
	isLoading?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
	type,
	onClick,
	title,
	isPrimary,
	className,
	iconButton,
	isLoading,
}) => {
	const IconButton = iconButton;

	return (
		<button
			onClick={onClick}
			type={type}
			disabled={isLoading}
			className={clsx(className, {
				[styles.btn_primary]: isPrimary,
				[styles.btn_secundary]: isPrimary === false,
			})}
		>
			{isLoading ? (
				<MoonLoader size={16} color="white" />
			) : (
				<>
						{IconButton && (
							<IconButton
								size={16}
								className="mr-2 flex justify-center items-center"
							/>
						)}
					{title}
				</>
			)}
		</button>
	);
};

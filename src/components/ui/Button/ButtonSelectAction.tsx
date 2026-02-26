import clsx from "clsx";

interface ButtonSelectAction {
    title: string;
    isActive: boolean;
    onClick: ()=> void;
}
export const ButtonSelectAction: React.FC<ButtonSelectAction> = ({
    title,
    isActive,
    onClick
}) => {
    return (
        <button
            type="button"
            className={clsx("text-[0.9375rem] flex-1 text-[#4b5563] font-medium rounded-md",
                {
                    "bg-[#EEF2FF] text-primary" : isActive
                }
            )}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

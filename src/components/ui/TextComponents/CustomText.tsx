interface CustomTextProps {
    children: React.ReactNode;
    className: string;
}
export const CustomText: React.FC<CustomTextProps>  = ({children, className}) => {
    return <p className={className}>{children}</p>
}
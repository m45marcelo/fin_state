interface ButtonsContainerProps {
    children: React.ReactNode;
    stylesContainer: string;
}

export const ButtonsContainer: React.FC<ButtonsContainerProps> = ({children, stylesContainer}) => {
    return (
        <div className={stylesContainer}>
            {children}
        </div>
    )
}
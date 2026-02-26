import '@/app/globals.css';
import clsx from 'clsx';

interface TitleCardH2Props {
    children: React.ReactNode,
    className?: string
}


export const TitleCardH2: React.FC<TitleCardH2Props> = ({children, className}) => {
    return(
        <h2 className={clsx("h2", className)}>
            {children}
        </h2>
    )
}
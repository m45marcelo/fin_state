import { ReactElement } from 'react';
import { TitleCardH2 } from '../../TextComponents/TittleCardH2';

interface ChartCardProps{
    chart: ReactElement;
}

export const ChartCard = ({chart}: ChartCardProps) => {
    return(
        <div className='w-[25.4375rem] flex flex-col p-[1.3125rem] bg-white shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl'>
            <TitleCardH2 className='text-base'>
                Despesas por Categoria
            </TitleCardH2>
            {
                chart
            }
        </div>
    )
}
"use client"
import { ReactElement, useEffect, useState } from 'react';
import { TitleCardH2 } from '../../TextComponents/TittleCardH2';
import Skeleton from 'react-loading-skeleton';
import { useGetAllTransactionsQuery } from '@/store/api/transactionApi';

interface ChartCardProps{
    chart: ReactElement;
    chartType: "income" | "expense";
}

export const ChartCard = ({chart , chartType}: ChartCardProps) => {
    const [isLoading, setIsLoading] = useState(true)
    const { data } = useGetAllTransactionsQuery({
        page: 1,
		limit: 10,
    })

    const dataTransaction = data?.transactions;

    useEffect(() => {
        setInterval(() => {
            setIsLoading(false)
        }, 3000)
    }, []);

    if(dataTransaction){
        if(dataTransaction?.length <= 0 ){
            return(
                <div className='w-[25.4375rem] min-h-[102px] flex flex-col p-[1.3125rem] bg-white shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl'>
                <TitleCardH2 className='text-base'>
                    {
                        chartType === "income" ? "Receitas por Categoria" : "Despesas por Categoria"
                    }
                </TitleCardH2>
                <span className="text-[14px] h-full flex items-center text-gray-400 font-light">Você não tem nenhuma transação registrada ainda</span>
            </div>
            )
        }
    }

    return(
        <div className='w-[25.4375rem] min-h-[422px] flex flex-col p-[1.3125rem] bg-white shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1)] rounded-2xl'>
            <TitleCardH2 className='text-base'>
                {
                    chartType === "income" ? "Receitas por Categoria" : "Despesas por Categoria"
                }
            </TitleCardH2>
            {
                    isLoading ? (
                        <div className='flex flex-col gap-5'>
                            <Skeleton height={260} width={"100%"}/>
                            <Skeleton height={140} width={"100%"}/>
                        </div>
                    ): (
                        chart
                    )
            }
        </div>
    )
}
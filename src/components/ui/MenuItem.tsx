'use client';
import { MdDashboard, MdReceiptLong } from "react-icons/md";
import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useGetMeQuery } from "@/store/api/userApi";

const links = [
    { name: 'Overview', href: '/', icon: MdDashboard },
    { name: 'Transações', href: '/transacoes', icon: MdReceiptLong },
]

export const MenuItem = () => {
    const pathname = usePathname();
    const {data} = useGetMeQuery();
    return (
        <nav className='flex ml-8 gap-8'>
            {
                data ? links.map((item) => {
                    return (
                        <Link 
                            key={item.name} 
                            href={item.href}
                            className={clsx(
                                'flex items-center text-[0.875rem] text-gray-500 h-[3.625rem]',
                                {
                                    ' text-gray-800 border-b border-b-indigo-600 font-medium hover:border-b hover:border-b-indigo-600': pathname === item.href
                                },
                                {
                                    'border-b border-b-transparent hover:border-b-gray-300 hover:text-gray-700' : pathname !== item.href
                                }
                            )}
                            >
                            {item.name}
                        </Link>
                    )
                }): 
                    <>
                        <Link 
                            key={links[0].name} 
                            href={links[0].href}
                            className={clsx(
                                'flex items-center text-[0.875rem] text-gray-500 h-[3.625rem]',
                                {
                                    ' text-gray-800 border-b border-b-indigo-600 font-medium hover:border-b hover:border-b-indigo-600': pathname === links[0].href
                                },
                                {
                                    'border-b border-b-transparent hover:border-b-gray-300 hover:text-gray-700' : pathname !== links[0].href
                                }
                            )}
                            >
                            {links[0].name}
                        </Link>

                        <span 
                            className={clsx(
                                'flex items-center text-[0.875rem] cursor-not-allowed text-gray-300 h-[3.625rem] border-b border-b-transparent hover:border-b-gray-300',
                            )}
                            >
                            {links[1].name}
                        </span>
                    </>
                
            }
        </nav>
    )
}
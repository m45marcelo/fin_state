import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import 'react-loading-skeleton/dist/skeleton.css'
import { ReduxProvider } from "@/store/Provider";
import { ChartProvider } from "@/providers/ChartProvider";
import "@/lib/chart";
import { ToastProvider } from "@/providers/ToastProvider";
const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "FinState",
	description: "Gerenciador de Finanças",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-[#F9FAFB] antialiased`}>
				<ReduxProvider>
					<ChartProvider>
						<ToastProvider/>
						{children}
					</ChartProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}

// components/ToastProvider.tsx
"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
	return (
		<Toaster
			position="top-center"
			toastOptions={{
				// Você pode definir estilos globais aqui
				duration: 3000,
				style: {
					background: "#363636",
					color: "#fff",
				},
			}}
		/>
	);
}

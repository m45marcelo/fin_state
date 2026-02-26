export const formatCurrency = (value: number | undefined) => {
	if(!value) return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(0);

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value)
};

export const formatCurrencyInput = (centsString: string | number): string => {
	if (!centsString) return "";
	const value = Number(centsString) / 100;
	return value.toLocaleString("pt-BR", {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	});
};

export const formatDateForInput = (isoString: Date | undefined): string => {
    if (!isoString) return "";

	const dateToString = String(isoString);
    const dateArray = dateToString.split("T");
    return dateArray[0]
};
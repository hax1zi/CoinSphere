export function formatMoney(value: number, currency: string, compact: boolean): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: 0,
        notation: compact === true ? "compact" : "standard",
    }).format(value);
}

export function formatPercentage(value: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value / 100);
}

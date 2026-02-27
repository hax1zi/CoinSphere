export function formatMoney(value: number, currency: string, compact: boolean, fractionDigits: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: currency,
        maximumFractionDigits: fractionDigits,
        notation: compact === true ? "compact" : "standard",
    }).format(value);
}

export function formatPercentage(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "percent",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Math.abs(value) / 100);
}

export function formatNumber(value: number): string {
    return new Intl.NumberFormat("pt-BR", {
        style: "decimal",
    }).format(value);
}

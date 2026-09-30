/** Colombian pesos without decimals, e.g. "$ 28.000" (es-CO) or "COP 28,000" (en-US). */
export function formatCop(amount: number, locale: string) {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(amount)
}

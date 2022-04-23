export type StatusProps = "ACTIVE" | "INACTIVE" | "SOLD";

export interface StockChartProps {
    date: string;
    totalPrice: string;
    totalCount: number
}

export interface StockSummaryProps {
    status: string;
    totalPrice: string;
    totalCount: number
}

export default interface StockProps {
    id: number | undefined;
    sku: string;
    model: string;
    name: string;
    price: string;
    status: StatusProps;
    soldAt?: string;
    createdAt: string;
    updatedAt: string;
}
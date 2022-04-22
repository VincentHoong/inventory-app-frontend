export type Status = "ACTIVE" | "INACTIVE" | "SOLD";

export default interface StockProps {
    id: number | undefined;
    sku: string;
    model: string;
    name: string;
    price: string;
    status: Status;
    soldAt?: string;
    createdAt: string;
    updatedAt: string;
}
export interface Product {
    name: string;
    unitPrice: number;
    backgroundColor?: string;
}

export interface Category {
    id: number;
    name: string;
    products: Product[];
}

export interface BarMenu {
    nuis: string;
    businessName: string;
    logo: string;
    categories: Category[];
}

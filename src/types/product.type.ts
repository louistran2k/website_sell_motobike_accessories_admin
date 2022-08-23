export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  isNew: boolean;
  unit: string;
  quantity: number;
  manufacturerId: number;
  warrantyPeriod: number | null;
  idType: number;
}

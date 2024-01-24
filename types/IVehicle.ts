export interface IVehicle {
  forEach(arg0: (data: IVehicle[]) => void): unknown;
  id: number;
  type: string;
  brand: string;
  colors: string[];
  img: string;
}

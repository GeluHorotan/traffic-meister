import React, { FC, useEffect, useState } from "react";

// Shadcn
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import { v4 } from "uuid";

import { ISelectItems } from "@/types/ISelectItems";
import { IKeys } from "@/types/IKeys";
import { IActiveFilters } from "@/types/IActiveFilters";
import { IVehicle } from "@/types/IVehicle";
import { capitalizeLetter } from "@/lib/capitalizeLetter";
import PleaseWait from "@/components/PleaseWait";

interface IFields {
  setVehicleCopy?: React.Dispatch<React.SetStateAction<IVehicle[] | undefined>>;
  vehicleData: IVehicle[] | undefined;
  vehicleCopy: IVehicle[] | undefined;
}

const Fields: FC<IFields> = ({ setVehicleCopy, vehicleCopy, vehicleData }) => {
  const [keys, setKeys] = useState<IKeys>({
    brands: v4(),
    types: v4(),
    colors: v4(),
  });
  const [activeFilters, setActiveFilters] = useState<IActiveFilters>({
    brand: false,
    type: false,
    color: false,
  });
  const [selectItems, setSelectItems] = useState<ISelectItems>({
    brands: [],
    types: [],
    colors: [],
  });

  const getSelectItems = (data: IVehicle[] | undefined) => {
    setSelectItems((prevState) => {
      let temporaryBrands: string[] = [];
      let temporaryTypes: string[] = [];
      let temporaryColors: string[] = [];

      data?.forEach((data: IVehicle) => {
        temporaryBrands.push(data?.brand);
        temporaryTypes.push(data?.type);
        data?.colors?.forEach((color: string) => temporaryColors.push(color));
      });

      return {
        brands: [...new Set(temporaryBrands)],
        types: [...new Set(temporaryTypes)],
        colors: [...new Set(temporaryColors)],
      };
    });
  };

  useEffect(() => {
    getSelectItems(vehicleData);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vehicleData]);

  return (
    <div className="p-6 rounded-lg w-full flex flex-col items-center justify-center gap-8 bg-white ">
      <div className="w-full flex gap-8 items-center justify-between max-[780px]:flex-col">
        <Select
          key={keys?.brands}
          disabled={selectItems.brands.length !== 0 ? false : true}
          onValueChange={(e) => {
            if (!activeFilters.type && !activeFilters.color) {
              setActiveFilters((prevState) => ({
                ...prevState,
                brand: true,
              }));
              const filtered = vehicleData?.filter((vehicle: IVehicle) =>
                vehicle?.brand?.includes(e)
              );
              getSelectItems(filtered);
              if (setVehicleCopy) setVehicleCopy(filtered);
            } else {
              setActiveFilters((prevState) => ({
                ...prevState,
                brand: true,
              }));
              const filtered = vehicleCopy?.filter((vehicle: IVehicle) =>
                vehicle?.brand?.includes(e)
              );
              getSelectItems(filtered);
              if (setVehicleCopy) setVehicleCopy(filtered);
            }
          }}
        >
          <SelectTrigger className="border-black" data-testid="brands">
            <SelectValue
              placeholder={
                selectItems.brands.length === 0 ? (
                  <PleaseWait isInField>Please wait.</PleaseWait>
                ) : (
                  "Select a brand."
                )
              }
            />
          </SelectTrigger>
          <SelectContent>
            {selectItems?.brands?.map((brand: any) => {
              return (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
        <Select
          key={keys?.types}
          disabled={selectItems.types.length !== 0 ? false : true}
          onValueChange={(e) => {
            if (!activeFilters.brand && !activeFilters.color) {
              setActiveFilters((prevState) => ({
                ...prevState,
                type: true,
              }));
              const filtered = vehicleData?.filter((vehicle: IVehicle) =>
                vehicle?.type?.includes(e)
              );
              getSelectItems(filtered);
              if (setVehicleCopy) setVehicleCopy(filtered);
            } else {
              setActiveFilters((prevState) => ({
                ...prevState,
                type: true,
              }));

              const filtered = vehicleCopy?.filter((vehicle: IVehicle) =>
                vehicle?.type?.includes(e)
              );
              getSelectItems(filtered);
              if (setVehicleCopy) setVehicleCopy(filtered);
            }
          }}
        >
          <SelectTrigger className="border-black" data-testid="types">
            <SelectValue
              placeholder={
                selectItems.types.length === 0 ? (
                  <PleaseWait isInField>Please wait.</PleaseWait>
                ) : (
                  "Select a brand."
                )
              }
            />
          </SelectTrigger>
          <SelectContent>
            {selectItems?.types?.map((type: any) => {
              return (
                <SelectItem key={type} value={type}>
                  {capitalizeLetter(type)}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <Select
          key={keys?.colors}
          disabled={selectItems.colors.length !== 0 ? false : true}
          onValueChange={(e) => {
            if (!activeFilters.brand && !activeFilters.type) {
              setActiveFilters((prevState) => ({
                ...prevState,
                color: true,
              }));
              const filtered = vehicleData?.filter((vehicle: IVehicle) =>
                vehicle?.colors?.includes(e)
              );
              getSelectItems(filtered);

              if (setVehicleCopy) setVehicleCopy(filtered);
            } else {
              setActiveFilters((prevState) => ({
                ...prevState,
                color: true,
              }));
              const filtered = vehicleCopy?.filter((vehicle: IVehicle) =>
                vehicle?.colors?.includes(e)
              );
              getSelectItems(filtered);
              if (setVehicleCopy) setVehicleCopy(filtered);
            }
          }}
        >
          <SelectTrigger className="border-black" data-testid="colors">
            <SelectValue
              placeholder={
                selectItems.colors.length === 0 ? (
                  <PleaseWait isInField>Please wait.</PleaseWait>
                ) : (
                  "Select a brand."
                )
              }
            />
          </SelectTrigger>
          <SelectContent>
            {selectItems?.colors?.map((color: any) => {
              return (
                <SelectItem key={color} value={color}>
                  {capitalizeLetter(color)}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
      <Button
        className="bg-blue-600 hover:bg-blue-900"
        color="primary"
        onClick={() => {
          setActiveFilters({ brand: false, type: false, color: false });
          getSelectItems(vehicleData);
          if (setVehicleCopy) setVehicleCopy(vehicleData);

          setKeys({ brands: v4(), types: v4(), colors: v4() });
        }}
      >
        CLEAR ALL FILTERS
      </Button>
    </div>
  );
};

export default Fields;

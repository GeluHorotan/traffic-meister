"use client";
import Image from "next/image";

import { useState, useEffect } from "react";

import { IVehicle } from "@/types/IVehicle";
import Fields from "@/components/Fields";

//Data
var trafficMeister = require("@/service/index");

export default function Home() {
  const [vehicleData, setVehicleData] = useState<IVehicle[]>();
  const [vehicleCopy, setVehicleCopy] = useState<IVehicle[]>();

  useEffect(() => {
    trafficMeister?.fetchData(function (err: string, data: any) {
      setVehicleData(data);
      setVehicleCopy(data);
    });
  }, []);

  if (vehicleCopy && vehicleData)
    return (
      <main className="flex bg-cyan-600 min-h-screen w-full flex-col items-center justify-center py-20 px-14">
        <div className="w-1/2 flex flex-col gap-8 items-center justify-center py-40">
          <div className="w-full flex gap-8  items-center justify-center">
            <Fields
              setVehicleCopy={setVehicleCopy}
              vehicleData={vehicleData}
              vehicleCopy={vehicleCopy}
            />
            {/* FIELDS */}
            {/* <Select
                key={keys.brands}
                onValueChange={(e) => {
                  console.log(e);
                  if (!activeFilters.type && !activeFilters.color) {
                    setActiveFilters((prevState) => ({
                      ...prevState,
                      brand: true,
                    }));
                    const filtered = vehicleData?.filter((vehicle, i) =>
                      vehicle?.brand?.includes(e)
                    );
                    getSelectItems(filtered);

                    setVehicleCopy(filtered);
                  } else {
                    setActiveFilters((prevState) => ({
                      ...prevState,
                      brand: true,
                    }));
                    const filtered = vehicleCopy?.filter((vehicle, i) =>
                      vehicle?.brand?.includes(e)
                    );
                    getSelectItems(filtered);

                    setVehicleCopy(filtered);
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a brand." />
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
                key={keys.types}
                onValueChange={(e) => {
                  console.log(e);
                  if (!activeFilters.brand && !activeFilters.color) {
                    setActiveFilters((prevState) => ({
                      ...prevState,
                      type: true,
                    }));
                    const filtered = vehicleData?.filter((vehicle, i) =>
                      vehicle?.type?.includes(e)
                    );
                    getSelectItems(filtered);

                    setVehicleCopy(filtered);
                  } else {
                    setActiveFilters((prevState) => ({
                      ...prevState,
                      type: true,
                    }));

                    const filtered = vehicleCopy?.filter((vehicle, i) =>
                      vehicle?.type?.includes(e)
                    );
                    getSelectItems(filtered);

                    setVehicleCopy(filtered);
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a type." />
                </SelectTrigger>
                <SelectContent>
                  {selectItems?.types?.map((type: any) => {
                    return (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              <Select
                key={keys.colors}
                onValueChange={(e) => {
                  console.log(activeFilters, "fff");
                  if (!activeFilters.brand && !activeFilters.type) {
                    setActiveFilters((prevState) => ({
                      ...prevState,
                      color: true,
                    }));
                    const filtered = vehicleData?.filter((vehicle, i) =>
                      vehicle?.colors?.includes(e)
                    );
                    getSelectItems(filtered);

                    setVehicleCopy(filtered);
                  } else {
                    setActiveFilters((prevState) => ({
                      ...prevState,
                      color: true,
                    }));
                    const filtered = vehicleCopy?.filter((vehicle, i) =>
                      vehicle?.colors?.includes(e)
                    );
                    getSelectItems(filtered);

                    setVehicleCopy(filtered);
                  }
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a brand." />
                </SelectTrigger>
                <SelectContent>
                  {selectItems?.colors?.map((color: any) => {
                    return (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select> */}
          </div>

          {/* <Button
            className="w-full"
            onClick={(e) => {
              setActiveFilters({ brand: false, type: false, color: false });
              getSelectItems(vehicleData);
              setVehicleCopy(vehicleData);
              setKeys({ brands: v4(), types: v4(), colors: v4() });
            }}
          >
            CLEAR ALL FILTERS
          </Button> */}
        </div>
        <div className="flex flex-wrap w-1/2 items-center justify-between gap-8 ">
          {vehicleCopy?.map((vehicle) => {
            return (
              <div key={vehicle?.brand} className="flex flex-col gap-2">
                <Image
                  height={200}
                  width={200}
                  src={vehicle?.img}
                  alt={vehicle?.brand}
                />
                <span className="text-3xl font-bold">{vehicle?.type}</span>
                <span className="text-xl font-semibold">{vehicle?.brand}</span>
                <span className="flex gap-2">
                  {vehicle?.colors?.map((color: string) => (
                    <span
                      style={{ backgroundColor: `${color}` }}
                      key={color}
                      className={`flex gap-4 h-4 w-4 rounded-full `}
                    ></span>
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </main>
    );
}

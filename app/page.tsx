"use client";
import Image from "next/image";

import { useState, useEffect } from "react";

// NextUI
import { Button } from "@nextui-org/button";
// import Select from "@/components/Select";
// import SelectItem from "@/components/SelectItem";
import { Select, SelectItem } from "@nextui-org/react";

//Data
var trafficMeister = require("@/service/index");

export default function Home() {
  const [activeCar, setActiveCar] = useState([]);
  const [activeFilters, setActiveFilters] = useState<any>(0);

  const [vehicleData, setVehicleData] = useState<any>();
  const [vehicleCopy, setVehicleCopy] = useState<any>();
  const [dropdownItems, setDropdownItems] = useState<any>({
    brands: [],
    types: [],
    colors: [],
  });

  const getDropdownItems = (data) => {
    // setActiveCar((prevState) => prevState.push(string));

    let temporaryBrands = [];

    data?.forEach((data) => temporaryBrands.push(data.brand));

    dropdownItems.brands = [...new Set(temporaryBrands)];
    // dropdownItems.types = [...new Set(temporaryTypes)];
    // dropdownItems.colors = [...new Set(temporaryColors)];
  };

  const getDisabledItems = (data, value) => {
    const disabledItems = data.filter((brand) => !brand.includes(value));
    setActiveCar(disabledItems);

    console.log(disabledItems, "test");
  };

  // const getPreviousResults = () => {
  //   const results = vehicleData.filter((vData) =>
  //     vData.brand.includes(activeFilters.activeBrand)
  //   );
  // };

  useEffect(() => {
    trafficMeister?.fetchData(function (err: string, data: any) {
      setVehicleData(data);
      setVehicleCopy(data);
      getDropdownItems(data);
    });
  }, []);

  if (vehicleCopy && vehicleData)
    return (
      <main className="flex bg-cyan-600 min-h-screen w-full flex-col items-center justify-center py-20 px-14">
        <div className="w-1/2 flex flex-col gap-8 items-center justify-center py-40">
          {dropdownItems && (
            <div className="w-full flex gap-8  items-center justify-center">
              <Select
                name={"brand"}
                id={"brand"}
                label={"Select brand."}
                disabledKeys={activeCar}
                onChange={(e) => {
                  if (activeFilters === 0) {
                    setActiveFilters((prevState) => prevState + 1);
                    const filtered = vehicleData?.filter((vehicle, i) =>
                      vehicle?.brand?.includes(e.target.value)
                    );
                    console.log(filtered);
                    getDisabledItems(dropdownItems.brands, e.target.value);
                    setVehicleCopy(filtered);
                  } else if (e.target.value.length === 0) {
                    setActiveFilters((prevState) => prevState - 1);
                    setActiveCar([]);
                  } else {
                    setActiveFilters((prevState) => prevState + 1);
                    const filtered = vehicleCopy?.filter((vehicle, i) =>
                      vehicle?.brand?.includes(e.target.value)
                    );
                    getDropdownItems(filtered);
                    setVehicleCopy(filtered);
                  }
                }}
              >
                {dropdownItems?.brands?.map((brand: any) => {
                  return (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  );
                })}
              </Select>

              {/* <Select
                label="Select type."
                onChange={(e) => {
                  if (activeFilters === 0) {
                    setActiveFilters((prevState) => prevState + 1);
                    const filtered = vehicleData?.filter((vehicle, i) =>
                      vehicle?.type?.includes(e.target.value)
                    );
                    getDropdownItems(filtered);

                    setVehicleCopy(filtered);
                  } else if (e.target.value.length === 0) {
                    setActiveFilters((prevState) => prevState - 1);
                  } else {
                    setActiveFilters((prevState) => prevState + 1);
                    const filtered = vehicleCopy?.filter((vehicle, i) =>
                      vehicle?.type?.includes(e.target.value)
                    );
                    getDropdownItems(filtered);

                    setVehicleCopy(filtered);
                  }
                }}
              >
                {dropdownItems?.types?.map((type: any) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Select color"
                onChange={(e) => {
                  if (activeFilters === 0) {
                    setActiveFilters((prevState) => prevState + 1);
                    const filtered = vehicleData?.filter((vehicle, i) =>
                      vehicle?.colors?.includes(e.target.value)
                    );
                    getDropdownItems(filtered);

                    setVehicleCopy(filtered);
                  } else if (e.target.value.length === 0) {
                    setActiveFilters((prevState) => prevState - 1);
                  } else {
                    setActiveFilters((prevState) => prevState + 1);
                    const filtered = vehicleCopy?.filter((vehicle, i) =>
                      vehicle?.colors?.includes(e.target.value)
                    );
                    getDropdownItems(filtered);

                    setVehicleCopy(filtered);
                  }
                }}
              >
                {dropdownItems?.colors?.map((color: any) => (
                  <SelectItem key={color} value={color}>
                    {color}
                  </SelectItem>
                ))}
              </Select> */}
            </div>
          )}
          <Button
            className="w-full"
            onClick={(e) => {
              getDropdownItems(vehicleData);
              setVehicleCopy(vehicleData);
            }}
          >
            CLEAR ALL FILTERS
          </Button>
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
                  {vehicle?.colors?.map((color) => (
                    <span
                      style={{ backgroundColor: `${color}` }}
                      key={vehicle?.color}
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

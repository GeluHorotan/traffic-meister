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
          <Fields
            setVehicleCopy={setVehicleCopy}
            vehicleData={vehicleData}
            vehicleCopy={vehicleCopy}
          />
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

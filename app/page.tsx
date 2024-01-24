"use client";
import Image from "next/image";

import { useState, useEffect } from "react";

import { IVehicle } from "@/types/IVehicle";
import Fields from "@/components/Fields";
import VehicleCard from "@/components/VehicleCard";
import NotFound from "@/components/NotFound";

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

  return (
    <main className="flex bg-gray-800 min-h-screen w-full flex-col items-center justify-center py-40 px-14 gap-20">
      <div className="w-[70%]  flex flex-col gap-8 items-center justify-center max-[1500px]:w-[90%] max-[950px]:w-full">
        <Fields
          setVehicleCopy={setVehicleCopy}
          vehicleData={vehicleData}
          vehicleCopy={vehicleCopy}
        />
      </div>

      {vehicleCopy ? (
        <div className=" grid grid-cols-3 w-[70%] max-[950px]:w-full max-[1500px]:w-[90%] max-[1245px]:grid-cols-2 max-[950px]:grid-cols-1 items-center justify-between gap-8 ">
          {vehicleCopy?.map((vehicle) => {
            return (
              <VehicleCard key={vehicle?.brand} vehicle={vehicle}></VehicleCard>
            );
          })}
        </div>
      ) : (
        <NotFound>Please wait, we&apos;re getting the vehicles.</NotFound>
      )}
    </main>
  );
}

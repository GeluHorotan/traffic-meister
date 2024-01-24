import Image from "next/image";
import React, { FC } from "react";

//Shadcn
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Icon
import { CircleDollarSign } from "lucide-react";

// Classname merge function
import { cn } from "@/lib/utils";
import { IVehicle } from "@/types/IVehicle";
import { capitalizeLetter } from "@/lib/capitalizeLetter";

interface IVehicleCard {
  vehicle: IVehicle;
  className?: string;
}

const VehicleCard: FC<IVehicleCard> = ({ vehicle, className, ...rest }) => {
  return (
    <div data-testid="vehicle-card">
      <Card className={cn("w-full ", className)} {...rest} id={vehicle?.brand}>
        <CardHeader>
          <CardDescription className="font-bold text-xl text-black">
            {capitalizeLetter(vehicle.type)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 h-[38vh] ">
          <Image
            height={600}
            width={600}
            src={vehicle?.img}
            alt={vehicle?.brand}
            className=" rounded-lg w-full h-full object-cover border shadow-sm"
          />
          <span className="text-xl font-semibold w-full ">
            {vehicle?.brand}
          </span>

          <span className="flex justify-between items-center  ">
            <span>Available on:</span>
            <div className="flex gap-2">
              {vehicle?.colors?.map((color: string) => (
                <span
                  style={{ backgroundColor: `${color}` }}
                  key={color}
                  className={`flex gap-4 h-2 w-8 border border-gray-500 shadow-md  rounded-3xl `}
                ></span>
              ))}
            </div>
          </span>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-blue-600 hover:bg-blue-900">
            <CircleDollarSign className="mr-2 h-4 w-4" /> BUY
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VehicleCard;

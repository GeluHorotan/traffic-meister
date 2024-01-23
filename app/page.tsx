"use client";
import Image from "next/image";

import { useState, useEffect } from "react";

// NextUI
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/select";

//Data
var trafficMeister = require("@/service/index");

export default function Home() {
  const [data, setData] = useState<any>();

  useEffect(() => {
    trafficMeister.fetchData(function (err: string, data: any) {
      setData(data);
    });
  }, []);

  return (
    <main className="flex bg-cyan-600 min-h-screen w-full items-center justify-center">
      <div className="w-1/2 flex gap-8">
        <Select label="Select brand" className="max-w-xs">
          {data?.map((item: any) => (
            <SelectItem key={item.id} value={item.brand}>
              {item.brand}
            </SelectItem>
          ))}
        </Select>
        <Select label="Select type" className="max-w-xs">
          {data?.map((item: any) => (
            <SelectItem key={item.id} value={item.type}>
              {item.type}
            </SelectItem>
          ))}
        </Select>
      </div>
    </main>
  );
}

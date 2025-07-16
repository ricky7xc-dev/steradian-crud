"use client";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

interface Car {
  name: string;
  image: string;
  month_rate: string;
  day_rate: string;
  id: number;
}

async function Home() {
  const [dataCars, setDataCars] = useState([]);
  let apiCars = await fetch(
    "https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars"
  );

  useEffect(() => {
    fetch("https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setDataCars(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const carsData = useMemo(() => {
    return dataCars || [];
  }, [dataCars]);

  const isEmpty = (str: string) => !str?.length;

  return (
    <>
      <div className="flex p-12 gap-4">
        <a href="/cars" className="text-lg font-bold">
          Cars
        </a>
        <a href="/orders" className="text-lg font-bold">
          Orders
        </a>
      </div>
    </>
  );
}

export default Home;

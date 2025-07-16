"use client";

import { Button, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";

export interface Car {
  car_id: string;
  car_name: string;
  image: string;
  month_rate: number;
  day_rate: number;
  id: number;
}

function Cars() {
  const [dataCars, setDataCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState<Car>();
  const [isEdit, setIsEdit] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const [car_name, setCarName] = useState("");
  const [month_rate, setMonthlyRate] = useState("");
  const [day_rate, setDayRate] = useState("");

  useEffect(() => {
    fetch("https://68771db6dba809d901edf72b.mockapi.io/cars")
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

  const openEdit = (selectedCar: any) => {
    setSelectedCar(selectedCar);
    setIsEdit(true);
    open();
    setCarName(selectedCar.car_name);
    setMonthlyRate(selectedCar.month_rate);
    setDayRate(selectedCar.day_rate);
  };

  console.log(selectedCar);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const submitData = { car_name, month_rate, day_rate };

    try {
      const res = await fetch(
        "https://68771db6dba809d901edf72b.mockapi.io/cars",
        {
          method: "POST",
          body: JSON.stringify(submitData),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      console.log(res);
      if (res.ok) {
        console.log("Yeai!");
        Swal.fire("Data berhasil di submit");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
    setCarName("");
    setMonthlyRate("");
    setDayRate("");
    close();
  };

  const handleSubmitEdit = async (e: any) => {
    e.preventDefault();
    const submitData = {
      car_id: selectedCar?.car_id,
      car_name,
      month_rate,
      day_rate,
    };

    try {
      const res = await fetch(
        `https://68771db6dba809d901edf72b.mockapi.io/cars/${selectedCar?.car_id}`,
        {
          method: "PUT",
          body: JSON.stringify(submitData),
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
            "Access-Control-Allow-Headers":
              "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          },
        }
      );
      console.log(res);
      if (res.ok) {
        console.log("Yeai!");
        Swal.fire("Data berhasil di ubah");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
    setCarName("");
    setMonthlyRate("");
    setDayRate("");
    close();
  };

  const handleDelete = async (e: any) => {
    try {
      const res = await fetch(
        `https://68771db6dba809d901edf72b.mockapi.io/cars/${e?.id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH",
            "Access-Control-Allow-Headers":
              "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
          },
        }
      );
      console.log(res);
      if (res.ok) {
        console.log("Yeai!");
        Swal.fire("Data berhasil di hapus");
      } else {
        console.log("Oops! Something is wrong.");
      }
    } catch (error) {
      console.log(error);
    }
    setCarName("");
    setMonthlyRate("");
    setDayRate("");
    close();
  };

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
      <div className="flex px-12 gap-4">
        <Button variant="filled" onClick={open}>
          Create Car
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-2 p-12">
        {dataCars.map((post: Car, i: number) => {
          const image = post.image == null ? "" : post.image;
          return (
            <div
              key={i}
              className="flex flex-col p-4 border border-gray-400 justify-between"
            >
              {post.car_name}
              <br />
              {post.month_rate}
              <br />
              {post.day_rate}
              <br />
              {image === "Invalid faker method - datatype.string" ||
              isEmpty(image) ||
              image.includes("C:") ? (
                <>invalid image</>
              ) : (
                <>image</>
                // <Image src={post.image} width={90} height={90} alt="car" />
              )}
              <br />
              <div className="flex gap-2 w-full">
                <Button variant="filled" onClick={() => openEdit(post)}>
                  edit
                </Button>
                <Button variant="filled" onClick={() => handleDelete(post)}>
                  delete
                </Button>
                {/* <Button variant="filled">order</Button> */}
              </div>
            </div>
          );
        })}
      </div>

      <Modal opened={opened} onClose={close} title="Create Cars" centered>
        <TextInput
          label="Nama Mobil"
          placeholder="bmw"
          value={car_name}
          onChange={(event) => setCarName(event.currentTarget.value)}
        />
        <TextInput
          label="Harga perbulan"
          placeholder="30000"
          value={month_rate}
          onChange={(event) => setMonthlyRate(event.currentTarget.value)}
        />
        <TextInput
          label="Harga perhari"
          placeholder="1000"
          value={day_rate}
          onChange={(event) => setDayRate(event.currentTarget.value)}
        />
        <br />
        <br />
        <Button
          variant="filled"
          onClick={isEdit ? handleSubmitEdit : handleSubmit}
        >
          Submit
        </Button>
      </Modal>
    </>
  );
}

export default Cars;

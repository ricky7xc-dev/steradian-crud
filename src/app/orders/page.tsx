"use client";

import { Button, ComboboxItem, Modal, Select, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { Car } from "../cars/page";
import Swal from "sweetalert2";

interface Order {
  id: number;
  order_date: string;
  pickup_date: string;
  dropoff_date: string;
  pickup_location: string;
  dropoff_location: string;
  month_rate: string;
  day_rate: string;
}

interface SelectOption {
  label: string;
  value: string;
}

export default function Orders() {
  const [isEdit, setIsEdit] = useState(false);
  const [dataOrders, setDataOrders] = useState([]);
  const [dataCars, setDataCars] = useState<any[]>([]);
  const [optionCars, setOptionCars] = useState<SelectOption[] | any[]>([]);
  const [opened, { open, close }] = useDisclosure(false);

  const [selectedOrder, setSelectedOrder] = useState<Order>();

  const [car_id, setSelectedCar] = useState<string | null>("");
  const [order_date, setOrderDate] = useState("");
  const [pickup_date, setPickupDate] = useState("");
  const [dropoff_date, setDropOffDate] = useState("");
  const [pickup_location, setPickupLocation] = useState("");
  const [dropoff_location, setDropOffLocation] = useState("");

  useEffect(() => {
    fetch("https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders")
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        setDataOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  useEffect(() => {
    if (dataCars) {
      setOptionCars(
        dataCars.map((p: any) => ({
          label: p.name,
          value: p.id,
        }))
      );
    } else {
      setOptionCars([]);
    }
  }, [dataCars]);

  function findCar(categoryId: any) {
    return optionCars.filter((obj) => obj.value === categoryId);
  }

  const openEdit = (selectedOrder: any) => {
    const setCar: any = findCar(selectedOrder.car_id);
    console.log(setCar);
    setSelectedOrder(selectedOrder);
    setIsEdit(true);
    open();
    setSelectedCar(selectedOrder.car_id);
    setOrderDate(selectedOrder.order_date);
    setPickupDate(selectedOrder.pickup_date);
    setDropOffDate(selectedOrder.dropoff_date);
    setPickupLocation(selectedOrder.pickup_location);
    setDropOffLocation(selectedOrder.dropoff_location);
  };

  console.log(selectedOrder);
  console.log(car_id);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const submitData = {
      car_id,
      order_date,
      pickup_date,
      dropoff_date,
      pickup_location,
      dropoff_location,
    };

    try {
      const res = await fetch(
        "https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders",
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
    setSelectedCar("");
    setOrderDate("");
    setPickupDate("");
    setDropOffDate("");
    setPickupLocation("");
    setDropOffLocation("");
    close();
  };

  const handleEdit = async (e: any) => {
    e.preventDefault();
    const submitData = {
      car_id,
      order_date,
      pickup_date,
      dropoff_date,
      pickup_location,
      dropoff_location,
    };

    try {
      const res = await fetch(
        `https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders/${selectedOrder?.id}`,
        {
          method: "PUT",
          body: JSON.stringify(submitData),
          headers: {
            "content-type": "application/json",
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
    setSelectedCar("");
    setOrderDate("");
    setPickupDate("");
    setDropOffDate("");
    setPickupLocation("");
    setDropOffLocation("");
    close();
  };

  const handleDelete = async (e: any) => {
    try {
      const res = await fetch(
        `https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders/${e?.id}`,
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
    setSelectedCar("");
    setOrderDate("");
    setPickupDate("");
    setDropOffDate("");
    setPickupLocation("");
    setDropOffLocation("");
    close();
  };

  if (dataOrders.length === 0) {
    <div>loading...</div>;
  }

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
          Create Order
        </Button>
      </div>
      <div className="flex w-full justify-center">
        <div className="flex max-w-[80%]">
          {dataOrders.length === 0 ? (
            <div>loading...</div>
          ) : (
            <table className="text-center">
              <thead>
                <tr>
                  <th>Action</th>
                  <th>Order Date</th>
                  <th>Pickup Date</th>
                  <th>Dropoff Date</th>
                  <th>Pickup Location</th>
                  <th>Dropoff Location</th>
                  <th>Month Rate</th>
                  <th>Day Rate</th>
                </tr>
              </thead>
              {dataOrders.map((post: Order, i: number) => {
                return (
                  <tbody key={i}>
                    <tr>
                      <td className="py-1">
                        <div className="flex gap-2">
                          <Button
                            variant="filled"
                            onClick={() => openEdit(post)}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="filled"
                            onClick={() => handleDelete(post)}
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                      <td>{post.order_date}</td>
                      <td>{post.pickup_date}</td>
                      <td>{post.dropoff_date}</td>
                      <td>{post.pickup_location}</td>
                      <td>{post.dropoff_location}</td>
                      <td>{post.month_rate}</td>
                      <td>{post.day_rate}</td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          )}
        </div>
      </div>

      <Modal opened={opened} onClose={close} title="Create Cars" centered>
        <Select
          label="Pilih Mobil"
          placeholder="klik disini untuk memilih"
          data={optionCars}
          value={car_id}
          onChange={(val: string | null) => {
            setSelectedCar(val); // Set the code (ID) which triggers city fetch
          }}
        />
        <TextInput
          label="Tanggal Order"
          placeholder="2025/07/16"
          value={order_date}
          onChange={(event) => setOrderDate(event.currentTarget.value)}
        />
        <TextInput
          label="Tanggal Pickup"
          placeholder="2025/07/16"
          value={pickup_date}
          onChange={(event) => setPickupDate(event.currentTarget.value)}
        />
        <TextInput
          label="Tanggal DropOff"
          placeholder="2025/07/16"
          value={dropoff_date}
          onChange={(event) => setDropOffDate(event.currentTarget.value)}
        />
        <TextInput
          label="Lokasi Pickup"
          placeholder="Jakarta"
          value={pickup_location}
          onChange={(event) => setPickupLocation(event.currentTarget.value)}
        />
        <TextInput
          label="Lokasi DropOff"
          placeholder="Bogor"
          value={dropoff_location}
          onChange={(event) => setDropOffLocation(event.currentTarget.value)}
        />
        <br />
        <br />
        <Button variant="filled" onClick={isEdit ? handleEdit : handleSubmit}>
          Submit
        </Button>
      </Modal>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function DeviceDetailsEdit({ ticket }) {
  const manufacture = {
    9779: "Lenovo",
    9776: "Asus",
    9778: "Compaq",
    9780: "Lenovo",
    9781: "Samsung",
    9772: "Toshiba",
    9777: "Hewlett-Packard",
    9774: "Apple",
    9773: "Sony",
    9782: "MSI",
    9775: "Acer",
    39673: "Microsoft",
    39674: "Gigabyte",
    9784: "Alienware",
    39675: "Alienware",
    9785: "other",
    9783: "eMachines/Acer",
    40006: "Dell",
  };

  const ticketMake = ticket.properties.Make;
  const replacedMake = manufacture[ticketMake] || ticketMake;

  const [isRevealed, setIsRevealed] = useState(false);
  const [progress, setProgress] = useState(100);
  const [deviceDetails, setDeviceDetails] = useState({
    make: ticket.properties["Make"] || "",
    model: ticket.properties["Model/Type"] || "",
    productId: ticket.properties["Product ID"] || "",
    location: ticket.properties["Bin"] || "",
    password: ticket.properties["Password"] || "",
    charger: ticket.properties["Charger"] || "",
    carryBag: ticket.properties["Carrybag"] || "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setDeviceDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    let timer;
    if (isRevealed) {
      const decrement = 100 / (10 * 10); // Countdown over 30 seconds

      timer = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress - decrement;
          if (newProgress <= 0) {
            clearInterval(timer);
            setIsRevealed(false); // Hide the text again after 30 seconds
            return 0;
          }
          return newProgress;
        });
      }, 50); // Update every second
    }

    return () => clearInterval(timer);
  }, [isRevealed]);

  const handleClick = () => {
    setIsRevealed(true);
    setProgress(100); // Reset progress to 100% when revealed
  };
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>Edit Device Details</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="make">Make</Label>
            <Input
              className="text-black"
              id="make"
              name="make"
              value={deviceDetails.make}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="model">Model</Label>
            <Input
              className="text-black"
              id="model"
              name="model"
              value={deviceDetails.model}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="productId">Product ID</Label>
            <Input
              className="text-black"
              id="productId"
              name="productId"
              value={deviceDetails.productId}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              className="text-black"
              id="location"
              name="location"
              value={location}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              className="text-black"
              id="password"
              name="password"
              type="password" // Use type="text" if you want it to be visible
              value={deviceDetails.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="charger">Charger</Label>
            <Input
              className="text-black"
              id="charger"
              name="charger"
              value={deviceDetails.charger}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="carryBag">Bag</Label>
            <Input
              className="text-black"
              id="carryBag"
              name="carryBag"
              value={deviceDetails.carryBag}
              onChange={handleInputChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CalendarIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function CheckCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function CheckSquareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function ComputerIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  );
}

function FileEditIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}

function FileTextIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  );
}

function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function TagIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}

function TrashIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function ShelfIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 508 508"
      fill="currentColor"
      stroke="currentColor"
    >
      <path d="M493.949,0h-479.8c-7.8,0-14.1,6.3-14.1,14.1v464.1c0,7.8,6.3,14.1,14.1,14.1h24v1.6c0,7.8,6.3,14.1,14.1,14.1 s14.1-6.3,14.1-14.1v-1.6h375.3v1.6c0,7.8,6.3,14.1,14.1,14.1c7.8,0,14.1-6.3,14.1-14.1v-1.6h24c7.8,0,14.1-6.3,14.1-14.1V14.1 C508.049,6.3,501.749,0,493.949,0z M479.849,464.1L479.849,464.1h-451.6V337.6h451.6V464.1z M176.649,309.4v-85.5l29.8,85.5 H176.649z M479.849,309.4L479.849,309.4h-243.5l-34.5-99.2l-25.1,8.7v-7.2h-28.2v97.7h-15.6v-97.7h-28.2v97.7h-15.8v-97.7h-28.2 v97.7h-32.5V182.9h451.6V309.4z M479.849,154.7L479.849,154.7h-347V57h-28.2v97.7h-15.7V57h-28.2v97.7h-32.5V28.2h451.6V154.7z" />
    </svg>
  );
}

function PasswordIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
    >
      <path d="M11.7802 10.2195C11.4872 9.92672 11.0124 9.92683 10.7195 10.2198C10.4267 10.5128 10.4268 10.9876 10.7198 11.2805L11.4395 11.9998L10.7197 12.7197C10.4268 13.0126 10.4268 13.4874 10.7197 13.7803C11.0126 14.0732 11.4874 14.0732 11.7803 13.7803L12.5004 13.0602L13.2198 13.7793C13.5128 14.0721 13.9876 14.072 14.2805 13.779C14.5733 13.4861 14.5732 13.0112 14.2802 12.7184L13.5611 11.9996L14.2803 11.2803C14.5732 10.9874 14.5732 10.5126 14.2803 10.2197C13.9874 9.92678 13.5126 9.92678 13.2197 10.2197L12.5002 10.9392L11.7802 10.2195Z" />
      <path d="M5.21954 10.2198C5.51237 9.92683 5.98724 9.92672 6.2802 10.2195L7.00017 10.9392L7.71967 10.2197C8.01256 9.92678 8.48743 9.92678 8.78033 10.2197C9.07322 10.5126 9.07322 10.9874 8.78033 11.2803L8.06108 11.9996L8.7802 12.7184C9.07317 13.0112 9.07328 13.4861 8.78046 13.779C8.48763 14.072 8.01276 14.0721 7.7198 13.7793L7.00042 13.0602L6.28033 13.7803C5.98744 14.0732 5.51256 14.0732 5.21967 13.7803C4.92678 13.4874 4.92678 13.0126 5.21967 12.7197L5.93951 11.9998L5.21979 11.2805C4.92683 10.9876 4.92672 10.5128 5.21954 10.2198Z" />
      <path d="M16.5 13.5C16.0858 13.5 15.75 13.8358 15.75 14.25C15.75 14.6642 16.0858 15 16.5 15H18.25C18.6642 15 19 14.6642 19 14.25C19 13.8358 18.6642 13.5 18.25 13.5H16.5Z" />
      <path d="M5.24923 5C3.454 5 2 6.45538 2 8.25V15.75C2 17.5449 3.45507 19 5.25 19H18.75C20.5449 19 22 17.5449 22 15.75V8.25C22 6.45538 20.546 5 18.7508 5H5.24923ZM3.5 8.25C3.5 7.2832 4.28303 6.5 5.24923 6.5H18.7508C19.717 6.5 20.5 7.2832 20.5 8.25V15.75C20.5 16.7165 19.7165 17.5 18.75 17.5H5.25C4.2835 17.5 3.5 16.7165 3.5 15.75V8.25Z" />
    </svg>
  );
}

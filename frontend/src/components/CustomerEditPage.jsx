import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  createCustomer,
  fetchCustomerById,
  updateCustomerById,
} from "@/api/customerAPI";
import { useNavigate, useParams } from "react-router-dom";

export function CustomerEditPage() {
  const navigate = useNavigate();

  const { customerId } = useParams();
  const [customer, setCustomer] = useState({
    firstname: "",
    lastname: "",
    business_name: "",
    email: "",
    phone: "",
    address: "",
    address_2: "",
    city: "",
    state: "",
    zip: "",
  });
  const [error, setError] = useState(null); // Define the error state

  // const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   if (customerId) {
  //     // setLoading(true);
  //     fetchCustomerById(customerId)
  //       .then((data) => {
  //         console.log("Fetched customer data:", data); // Debug log

  //         setCustomer(data.customer);
  //         // setLoading(false);
  //       })
  //       .catch((err) => {
  //         console.error(`Error fetching customer with ID ${customerId}:`, err);
  //         setError(err.message); // Store the error message
  //         // setLoading(false);
  //       });
  //   } else {
  //     setCustomer({
  //       firstname: "",
  //       lastname: "",
  //       business_name: "",
  //       email: "",
  //       phone: "",
  //       address: "",
  //       address_2: "",
  //       city: "",
  //       state: "",
  //       zip: "",
  //     });
  //   }
  // }, [customerId]);

  const isEditMode = !!customerId;

  useEffect(() => {
    if (isEditMode) {
      fetchCustomerById(customerId)
        .then((data) => {
          setCustomer(data.customer || {}); // Assuming the API returns a property named "customer"
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  }, [customerId, isEditMode]);

  useEffect(() => {
    // Assuming `customer` is your state object holding customer details
    // And assuming you have setter for your customer state, e.g., `setCustomer`
    const updatedFullName = `${customer.firstname} ${customer.lastname}`.trim();
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      fullname: updatedFullName,
    }));
  }, [customer.firstname, customer.lastname]); // Dependencies on firstname and lastname

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent the default form submission
  //   updateCustomerById(customerId, customer)
  //     .then(() => {
  //       // Handle successful update
  //       navigate(`/customers/${customerId}`); // Redirect to customer detail page or another appropriate page
  //     })
  //     .catch((err) => {
  //       setError(err.message); // Handle error
  //     });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Compute the updated full name and prepare the data for update or create
    const updatedCustomer = {
      ...customer,
      fullname: `${customer.firstname} ${customer.lastname}`.trim(),
    };

    // Decide whether to create a new customer or update an existing one
    const action = isEditMode
      ? updateCustomerById(customerId, updatedCustomer) // Use updatedCustomer for updating
      : createCustomer(updatedCustomer); // Use updatedCustomer for creating

    try {
      const result = await action; // Await the result of the action
      navigate(isEditMode ? `/customers/${customerId}` : "/customers");
      // Optionally, show a success notification here
    } catch (error) {
      setError(error.toString()); // Handle and display error
      // Optionally, show an error notification here
    }
  };

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page
  };

  if (error) {
    return <div>Error: {error}</div>; // Render error message if there is an error
  }

  if (!customer) {
    // Render loading state or null if customer data hasn't been fetched yet
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className=" text-black p-8 bg-gray-200">
      <h2>CustomerEditPage.jsx</h2>
      <div className=" p-4 ">
        <h2 className="text-xl text-orange-500 font-semibold"> Editing: </h2>
        <h1 className="text-3xl font-semibold mb-2">{customer.fullname}</h1>
      </div>
      <div className="flex justify-end space-x-4 mb-8">
        <Button
          type="submit"
          className="text-white bg-green-600 hover:bg-green-800"
        >
          Save Changes
        </Button>
        <Button
          type="button"
          onClick={goBack}
          className="text-black"
          variant="outline"
        >
          Cancel
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2  p-4 rounded-md">
          <h2 className="font-semibold mb-4">Contact Details</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="first-name">First Name</Label>
              <Input
                className="text-black"
                id="first-name"
                name="firstname" // Add the 'name' attribute to match customer object keys
                value={customer.firstname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="last-name">Last Name</Label>
              <Input
                className="text-black"
                id="last-name"
                name="lastname" // Add the 'name' attribute to match customer object keys
                value={customer.lastname}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="business-name">Business Name</Label>
              <Input
                className="text-black"
                id="business-name"
                name="businessname"
                value={customer.business_name}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                className="text-black"
                id="email"
                name="email"
                value={customer.email}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                className="text-black"
                name="phone"
                value={customer.phone}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <Button className="text-black" variant="outline">
            + Add New Number
          </Button>
          <h2 className="font-semibold mb-4 mt-8">CUSTOMER SETTINGS</h2>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Label htmlFor="store-credit">Store Credit</Label>
            <Input id="store-credit" placeholder="$0.00" />
            <Button>Add Store Credit</Button>
            <Label htmlFor="tax-rate">Tax Rate</Label>
            <Select className="text-black">
              <SelectTrigger id="tax-rate">
                <SelectValue placeholder="Tax Rate" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="0">0%</SelectItem>
                <SelectItem value="5">5%</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="tax-free">Tax Free</Label>
            <Switch id="tax-free" />
            <Label htmlFor="tags">Tags</Label>
            <Select className="text-black">
              <SelectTrigger id="tags">
                <SelectValue placeholder="Click to add Tags" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="tag1">Tag 1</SelectItem>
                <SelectItem value="tag2">Tag 2</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="remote-access">Enable Remote Access</Label>
            <Switch id="remote-access" />
          </div>
        </div>
        <div className=" p-4 rounded-md">
          <h2 className="font-semibold mb-4">Address</h2>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Label htmlFor="address-line-1">Address line 1</Label>
            <Input
              id="address-line-1"
              className="text-black"
              name="address"
              value={customer.address}
              onChange={handleInputChange}
            />
            <Label htmlFor="address-line-2">Address line 2</Label>
            <Input
              id="address-line-2"
              className="text-black"
              name="address2"
              value={customer.address_2}
              onChange={handleInputChange}
            />
            <Label htmlFor="suburb">Suburb</Label>
            <Input
              id="suburb"
              className="text-black"
              name="name"
              value={customer.city}
              onChange={handleInputChange}
            />
            <Label htmlFor="state-country">State</Label>
            <Input
              id="state-country"
              className="text-black"
              name="state"
              value={customer.state}
              onChange={handleInputChange}
            />
            <Label htmlFor="zip-postal-code">Postal Code</Label>
            <Input
              id="zip-postal-code"
              className="text-black"
              name="zip"
              value={customer.zip}
              onChange={handleInputChange}
            />
          </div>
          <Button>+ Add Another Site/Address</Button>
          <h2 className="font-semibold mb-4 mt-8">Notifications</h2>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <Label htmlFor="sms-service">SMS Service Enabled</Label>
            <Switch id="sms-service" />
            <Label htmlFor="billing-emails">Receive Billing Emails</Label>
            <Switch id="billing-emails" />
            <Label htmlFor="marketing-emails">Receive Marketing Emails</Label>
            <Switch id="marketing-emails" />
            <Label htmlFor="email-addresses-1">Email Addresses</Label>
            <Input
              id="email-addresses-1"
              placeholder="Email Addresses (comma separated)"
            />
            <Label htmlFor="email-addresses-2">Email Addresses</Label>
            <Input
              id="email-addresses-2"
              placeholder="Email Addresses (comma separated)"
            />
            <Label htmlFor="email-addresses-3">Email Addresses</Label>
            <Input
              id="email-addresses-3"
              placeholder="Email Addresses (comma separated)"
            />
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Label htmlFor="estimate-template">Estimate Template</Label>
            <Select className="text-black">
              <SelectTrigger id="estimate-template">
                <SelectValue placeholder="Use Default" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="ticket-template">Ticket Template</Label>
            <Select className="text-black">
              <SelectTrigger id="ticket-template">
                <SelectValue placeholder="Use Default" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="invoice-template">Invoice Template</Label>
            <Select className="text-black">
              <SelectTrigger id="invoice-template">
                <SelectValue placeholder="Use Default" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            <Label htmlFor="invoice-terms">Invoice Terms</Label>
            <Select className="text-black">
              <SelectTrigger id="invoice-terms">
                <SelectValue placeholder="Use Default" />
              </SelectTrigger>
              <SelectContent position="popper">
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <footer className="text-sm mt-8">
        Footer - Company Name - Copyright
      </footer>
    </form>
  );
}

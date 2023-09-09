import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'


const ManagementForm = ({ showMenu, setShowMenu }) => {
    const [customer, setCustomer] = useState({
        name: "",
        contact: "",
        address: "",
        date: "",
        duration: "",
        amount: ""
    })

    const [error, setError] = useState("")

    const router = useRouter();

    const { name, contact, address, date, duration, amount } = customer;
    const addCustomer = async () => {
        try {
            if (!name || !contact || !address || !date || !duration || !amount) {
                setError("Please provide all credentials")
            }
            await axios.post("/api/customers", customer);
            // Handle success if needed
            router.push("/Dashboard")
        }
        catch (err) {
            setError("Error creating customer");
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCustomer((prevCustomer) => ({
            ...prevCustomer,
            [name]: value
        }));
    }

    const handleAddCustomer = (e) => {
        e.preventDefault()
        addCustomer()
    }
    return (
        <div className='fixed  inset-0 flex flex-col justify-center items-center z-50 bg-opacity-50 bg-black'>
            <div className='w-full flex justify-end px-10 absolute top-0 right-6'><button className='font-extrabold text-[100px] cursor-pointer' onClick={() => setShowMenu()}>x</button></div>
            {showMenu && (
                <div className='w-[500px] bg-[#f1f1f1] rounded-lg py-10'>
                    <h1 className='text-center font-bold text-3xl uppercase text-black'>Customer Information</h1>
                    <form className='px-10 w-full py-8 mx-auto rounded-lg text-black' onSubmit={handleAddCustomer}>
                        <div className='my-5'>
                            <input type="text" name="name" id="name" className="w-full px-3 py-2" placeholder='Name' value={name} onChange={handleInputChange} />
                        </div>

                        <div className='my-5'>
                            <input type="text" name="contact" id="contact" className="w-full px-3 py-2" placeholder='Contact' value={contact} onChange={handleInputChange} />
                        </div>

                        <div className='my-5'>
                            <input type="text" name="address" id="address" className="w-full px-3 py-2" placeholder='Address' value={address} onChange={handleInputChange} />
                        </div>
                        <div className='my-5'>
                            <input type="date" name="date" id="date" className="w-full px-3 py-2" placeholder='Date' value={date} onChange={handleInputChange} />
                        </div>
                        <div className='my-5'>
                            <input type="text" name="duration" id="duration" className="w-full px-3 py-2" placeholder='Duration' value={duration} onChange={handleInputChange} />
                        </div>
                        <div className='my-5'>
                            <input type="text" name="amount" id="amount" className="w-full px-3 py-2" placeholder='Amount' value={amount} onChange={handleInputChange} />
                        </div>
                        <div className='items-center justify-center flex bg-[#0762EA]'>
                            <button type="submit" className='uppercase text-white py-2' onClick={setShowMenu(false)}>Book</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ManagementForm
import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const AddNewPc = ({ showPcMenu, setShowPcMenu }) => {
    const [pc, setPc] = useState({
        name: "",
        type: "",
        status: "",
    })
    const router = useRouter()

    const [error, setError] = useState("")

    const { name, type, status } = pc;
    const addPc = async () => {
        try {
            if (!name || !type || !status ) {
                setError("Please provide all credentials")
            }
            await axios.post("/api/pc", pc);
            // Handle success if needed
            router.push("/Dashboard")
        }
        catch (err) {
            setError("Error creating Pc");
            console.error(err);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPc((prevPc) => ({
            ...prevPc,
            [name]: value
        }));
    }

    const handleAddPc = (e) => {
        e.preventDefault()
        addPc()
    }
    return (
        <div className='fixed inset-0 flex flex-col justify-center items-center z-50 bg-opacity-50 bg-black'>
            <div className='w-full flex justify-end px-10 absolute top-0 right-6'><button className='font-extrabold text-[100px] cursor-pointer' onClick={() => setShowPcMenu()}>x</button></div>
            {showPcMenu && (
                <div className='w-[500px] bg-[#f1f1f1] rounded-lg py-10'>
                    <h1 className='text-center font-bold text-3xl uppercase text-black'>Pc Information</h1>
                    {error && <p className='text-red-500'>{error}</p>}
                    <form className='px-10 w-full py-8 mx-auto rounded-lg text-black' onSubmit={handleAddPc}>
                        <div className='my-5'>
                            <input type="text" name="name" id="name" className="w-full px-3 py-2" placeholder='Name' value={name} onChange={handleInputChange} />
                        </div>

                        <div className='my-5'>
                            <input type="text" name="type" id="type" className="w-full px-3 py-2" placeholder='Package Type' value={type} onChange={handleInputChange} />
                        </div>

                        <div className='my-5'>
                            <select name="status" id="status" className="text-slate-500 w-full px-3 py-2" placeholder='status' value={status} onChange={handleInputChange}>
                                <option value="available">Available</option>
                                <option value="online">Online</option>
                                <option value="booked">Booked</option>
                                <option value="disconnected">Disconnected</option>
                            </select>
                        </div>
                        <div className='items-center justify-center flex bg-[#2A2727] rounded-lg'>
                            <button type="submit" className='uppercase py-2 hover:bg-[#0762EA] w-full outline-none rounded-lg font-bold'>Add</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    )
}

export default AddNewPc
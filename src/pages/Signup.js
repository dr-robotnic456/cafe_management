import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

function Signup() {
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirm_password:""
    })
    const [show, setShow] = useState(false);

    const router = useRouter()

    const [error, setError] = useState("");
    const addUser = async() => {
        try {
          if (user.password !== user.confirm_password) {
            setError("Passwords do not match");
            return;
          }
          await axios.post("/api/users", user);
          // Handle success if needed
          router.push("/Login")
        }
        catch (err) {
          setError("Error creating employee");
          console.error(err);
        }
      };

      const handleInputChange = (e) => {
        const {name, value} = e.target;
        setUser((prevUser) => ({
          ...prevUser,
          [name] : value
        }));
      }

      const handleAddUser = (e) => {
        e.preventDefault();
        addUser()
      }
    return (
        <div className='h-screen flex justify-center items-center' style={{
            backgroundImage: "url('/bg.jpg')",
            backgroundSize: "90%",
            objectFit: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        }}>
            <div className='flex flex-col relative rounded-lg bg-white bg-opacity-90 h-[500px] items-center border w-[550px] text-black'>
                <div className='items-center w-full z-10 px-10'>
                    <h1 className='text-2xl font-bold uppercase z-10 pt-10'>Signup</h1>
                    {error && <p>{error}</p>}
                    <form className='w-full items-center' onSubmit={handleAddUser}>

                        <div className='mx-auto my-5 bg-white '>
                            <input type="text" name="name" id="name" placeholder='Name' className='w-full py-2 px-2 focus:outline-none '  value={user.name} onChange={handleInputChange}/>
                            <div className='bg-gradient-to-b from-white to-[#f09440] h-2 w-full' />
                        </div>
                        <div className='mx-auto my-5 bg-white '>
                            <input type="text" name="email" id="email" placeholder='Email' className='w-full py-2 px-2 focus:outline-none '  value={user.email} onChange={handleInputChange}/>
                            <div className='bg-gradient-to-b from-white to-[#f09440] h-2 w-full' />
                        </div>

                        <div className='mx-auto my-5'>
                            <input type={`${show ? "text" : "password"}`} name="password" id="password" placeholder='Password' className='w-full py-2 px-2 focus:outline-none'  value={user.password} onChange={handleInputChange}/>
                            <div className='bg-gradient-to-b from-white to-[#f09440] h-2 w-full' />
                        </div>

                        <div className='mx-auto my-5'>
                            <input type={`${show ? "text" : "password"}`} name="confirm_password" id="confirm_password" placeholder='Confirm   Password' className='w-full py-2 px-2 focus:outline-none '  value={user.confirm_password} onChange={handleInputChange}/>
                            <div className='bg-gradient-to-b from-white to-[#f09440] h-2 w-full' />
                        </div>

                        <div className='w-full justify-end items-center space-x-2 text-slate-400 font-bold flex'>
                            <input type="checkbox" name="showPass" id="showPass" onClick={() => setShow(!show)}/>
                            <label htmlFor="showPass">Show Password</label>
                        </div>

                        <div className='flex w-full justify-between text-white absolute bottom-0 left-0'>
                            <button className='bg-[#f09440] w-[50%] uppercase py-6 font-bold cursor-pointer'>SIGN UP</button>
                            <Link href={"/Login"} className='bg-slate-400 w-[50%] text-center'><button className='uppercase py-6 font-bold cursor-pointer'>login</button></Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup
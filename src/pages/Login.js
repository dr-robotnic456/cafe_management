import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [show, setShow] = useState(false);

  const [error, setError] = useState(""); // State for error messages

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  const fetchUser = async (email, password) => {
    try {
      const response = await axios.post("/api/login", { email, password });
      const { token } = response.data;

      if (token) {

        localStorage.setItem("token", token);
        router.push("/Dashboard");
      }
    } catch (err) {
      // Handle errors and set the error state
      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred while logging in.");
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault()
    fetchUser(user.email,user.password);
  }
  return (
    <div className='h-screen flex justify-center items-center' style={{
      backgroundImage: "url('/bg.jpg')",
      backgroundSize: "90%",
      objectFit: "contain",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center"
    }}>
      <div className='flex flex-col relative rounded-lg bg-white bg-opacity-90 h-[400px] items-center border w-[550px] text-black'>
        <div className='items-center w-full z-10 px-10'>
          <h1 className='text-2xl font-bold uppercase z-10 pt-10'>Login</h1>
          {error && <p>{error}</p>}
          <form className='w-full items-center' onSubmit={handleLogin}>

            <div className='mx-auto my-10 bg-white '>
              <input type="email" name="email" id="email" placeholder='Email' value={user.name} onChange={handleInputChange} className='w-full py-2 px-2 focus:outline-none ' />
              <div className='bg-gradient-to-b from-white to-[#f09440] h-2 w-full' />
            </div>

            <div className='mx-auto my-10'>
              <input type={`${show ? "text" : "password"}`} name="password" id="password" placeholder='Password' className='w-full py-2 px-2 focus:outline-none ' value={user.password} onChange={handleInputChange} />
              <div className='bg-gradient-to-b from-white to-[#f09440] h-2 w-full' />
            </div>

            <div className='w-full justify-end items-center space-x-2 text-slate-400 font-bold flex'>
              <input type="checkbox" name="showPass" id="showPass" onClick={() => setShow(!show)} />
              <label htmlFor="showPass">Show Password</label>
            </div>


            <div className='flex w-full justify-between text-white absolute bottom-0 left-0'>
              <button className='bg-[#f09440] w-[50%] uppercase py-6' type='submit'>LOGIN</button>
              <Link href={"/Signup"} className='bg-slate-400 w-[50%] uppercase py-6 text-center'><button>SIGN UP</button></Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
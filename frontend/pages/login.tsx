import { useState, ChangeEvent, FormEvent } from "react"
import axios from "axios";
import Router, { useRouter } from "next/router";
import Link from "next/link";


export default function Login() {
    const router = useRouter()
    const [data, setData] = useState({
        username: '',
        password: ''
    })
    const [success, setSuccess] = useState(false)
    const [error, seterror] = useState({ status: false, message: '' })

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/users/login`, data)

            if (response.status === 200) {
                setSuccess(true)
                seterror({ status: false, message: '' })
                localStorage.setItem("token", response.data.Token);
                sessionStorage.setItem("token", response.data.Token);

                setTimeout(() => {
                    router.push('/')
                }, 1000);
                return response.data
            } else {
                seterror({ status: true, message: response.data })
            }
        } catch (error: any) {
            seterror({ status: true, message: error.response.data })
            setSuccess(false)
        }
    }



    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        setData({ ...data, [event.target.name]: event.target.value });
    }


    return (
        <>
            {
                success ?
                    <p className="text-6xl h-screen items-center justify-center flex sm:text-center sm:text-xl"> Welcome Onboard <span className="text-green-400 bold">&nbsp;{data.username}</span> 🥳</p>
                    :
                    <div className="container my-10 mx-auto">
                        <h1 className="text-4xl">Hello User 👋</h1>
                        <div className="text-2xl my-5">Lets Login Now!! 🔏</div>
                        <form onSubmit={handleSubmit} >
                            <div className="block mt-10">
                                <label >Username : </label>
                                <input type="text" className="outline-none sm:w-full  rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="username" value={data.username} onChange={handleInputChange} />
                            </div>
                            <div className="block mt-5">
                                <label >Password : </label>
                                <input type="password" className="outline-none sm:w-full  rounded px-4 py-2 bg-transparent border-dashed border-green-500 border-2 " name="password" value={data.password} onChange={handleInputChange} />
                            </div>
                            <div className="flex items-center mt-8 sm:flex-col ">
                                <button className="sm:w-full me-10 sm:mx-0 sm:mt-5 bg-green-300 px-5 text-black text-xl py-2 rounded-md">login</button>
                                <Link href="/register" className="sm:mt-10">New User? Register Here</Link>
                            </div>
                        </form>
                        {
                            error && error.status && <p className="text-6xl"> {error.message}</p>
                        }
                    </div>
            }

        </>

    )
}

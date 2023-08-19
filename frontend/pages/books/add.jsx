import { useState, useEffect } from "react";
import { useRouter } from "next/router"
import Loading from '../../components/Loading'

function add() {
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState('')
    const router = useRouter();


    useEffect(() => {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (!token) {
            router.push('/login')
        } else {
            setToken(token);
            setTimeout(() => {
                setLoading(false)
            }, 1000);
        }
    }, [])



    return (
        <>
            {
                loading ? <Loading />
                    :
                    <div className="container mt-10">
                        <p className="text-4xl my-10 italic ">Add Your Book.</p>
                        <div className="flex w-1/2 my-3">
                            <label className="w-1/4">Title:</label>
                            <input type="text" className="bg-transparent border rounded p-1 mx-5 w-full" />
                        </div>
                        <div className="flex w-1/2 my-3">
                            <label className="w-1/4">Title:</label>
                            <input type="text" className="bg-transparent border rounded p-1 mx-5 w-full" />
                        </div>


                    </div>
            }
        </>

    )
}

export default add

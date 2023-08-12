import Loading from "@/components/Loading";
import { useRouter } from "next/router"
import { useEffect, useState } from "react";



export default function Home() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.replace('/login');
    }

    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, []);


  return (
    <>
      {
        loading ? <Loading />
          :
          <div className="container">
            <h1 className="text-center mt-10 text-6xl sm:text-3xl">Home page 🏠</h1>
          </div>
      }
    </>
  )
}

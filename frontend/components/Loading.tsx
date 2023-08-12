import { ScaleLoader } from "react-spinners"


function Loading() {
    return (
        <div className="flex h-screen items-center justify-center">
            <ScaleLoader color="green" />
        </div>
    )
}

export default Loading

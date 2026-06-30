"use client"
import MapComponent from "./MapComponent"
import { useRouter } from "next/navigation"

const IngredientEditPage = ({ingredient, id}) => {
    const router = useRouter()

    const handleSubmit = (e) => {
        router.push(`/ingredients/${id}`)
    }

    return ( 
        <>
            <div>
            {Object.entries(ingredient).map(([key, value]) => (
                <p key={key}>
                <strong>{key}:</strong> {String(value)}
                </p>
            ))}
            <button onClick={e=>handleSubmit(e)}> save </button>

            </div>
            {/* <MapComponent></MapComponent> */}
        </>
    )
}

export default IngredientEditPage
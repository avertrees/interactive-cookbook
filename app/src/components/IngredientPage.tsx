import MapComponent from "./MapComponent"

const IngredientPage = async ({ingredient}) => {
    return ( 
        <>
            <div>
            {Object.entries(ingredient).map(([key, value]) => (
                <p key={key}>
                <strong>{key}:</strong> {String(value)}
                </p>
            ))}
            </div>
            {/* <MapComponent></MapComponent> */}
        </>
    )
}

export default IngredientPage
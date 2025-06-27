import MapComponent from "./MapComponent"

const IngredientPage = ({ingredient}) => {
    return ( 
        <>
            <p>{ingredient.name}</p>
            <MapComponent></MapComponent>
        </>
    )
}

export default IngredientPage
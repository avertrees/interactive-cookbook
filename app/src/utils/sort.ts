export function sortIngredientsByField(ingredients, field) {
  return ingredients.sort((a, b) => {
    const valueA = a[field]?.toLowerCase?.() || "";
    const valueB = b[field]?.toLowerCase?.() || "";

    return valueA.localeCompare(valueB);
  });
}
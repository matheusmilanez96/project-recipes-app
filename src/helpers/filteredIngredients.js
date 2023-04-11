// função de filtragem dos ingredientes (e suas quantidades) para cada receita
const filteredIngredients = (recipe) => {
  let result = [];
  Object.keys(recipe)
    .filter((key) => key.includes('strIngredient'))
    .forEach((key, index) => {
      if (recipe[key] !== null && recipe[key] !== '') {
        const ingredient = [recipe[key], recipe[`strMeasure${index + 1}`] ?? ''];
        result = [...result, ingredient];
      }
    });
  return result;
};

export default filteredIngredients;

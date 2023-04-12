const getMealObj = (recipe) => {
  const finalRecipe = {
    id: recipe.idMeal ? recipe.idMeal : '',
    type: 'meal',
    nationality: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory ? recipe.strCategory : '',
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    name: recipe.strMeal ? recipe.strMeal : '',
    image: recipe.strMealThumb ? recipe.strMealThumb : '',
  };
  return finalRecipe;
};

export default getMealObj;

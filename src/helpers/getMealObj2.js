const getMealObj2 = (recipe) => {
  let recipeTags;
  if (recipe.strTags !== null) {
    recipeTags = recipe.strTags.split(',');
  }
  const now = new Date();
  const date = now.toISOString();
  const finalRecipe = {
    id: recipe.idMeal ? recipe.idMeal : '',
    nationality: recipe.strArea ? recipe.strArea : '',
    name: recipe.strMeal ? recipe.strMeal : '',
    category: recipe.strCategory ? recipe.strCategory : '',
    image: recipe.strMealThumb ? recipe.strMealThumb : '',
    tags: recipeTags || [],
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    type: 'meal',
    doneDate: date,
  };
  return finalRecipe;
};

export default getMealObj2;

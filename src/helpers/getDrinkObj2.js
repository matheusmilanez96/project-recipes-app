const getDrinkObj2 = (recipe) => {
  let recipeTags;
  if (recipe.strTags !== null) {
    recipeTags = recipe.strTags.split(',');
  }
  const now = new Date();
  const date = now.toISOString();
  const finalRecipe = {
    id: recipe.idDrink ? recipe.idDrink : '',
    nationality: recipe.strArea ? recipe.strArea : '',
    name: recipe.strDrink ? recipe.strDrink : '',
    category: recipe.strCategory ? recipe.strCategory : '',
    image: recipe.strDrinkThumb ? recipe.strDrinkThumb : '',
    tags: recipeTags || [],
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    type: 'drink',
    doneDate: date,
  };
  return finalRecipe;
};

export default getDrinkObj2;

const getDrinkObj = (recipe) => {
  const finalRecipe = {
    id: recipe.idDrink ? recipe.idDrink : '',
    type: 'drink',
    nationality: recipe.strArea ? recipe.strArea : '',
    category: recipe.strCategory ? recipe.strCategory : '',
    alcoholicOrNot: recipe.strAlcoholic ? recipe.strAlcoholic : '',
    name: recipe.strDrink ? recipe.strDrink : '',
    image: recipe.strDrinkThumb ? recipe.strDrinkThumb : '',
  };
  return finalRecipe;
};

export default getDrinkObj;

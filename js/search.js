const ingredients = [];

// Event listener for the "+" button
document.getElementById("addIngredientButton").addEventListener("click", function() {
  const ingredientInput = document.getElementById("ingredientInput");
  const ingredient = ingredientInput.value.trim();
  
  if (ingredient && !ingredients.includes(ingredient)) {
    ingredients.push(ingredient);
    updateIngredientsList();
    ingredientInput.value = ""; // Clear the input field

    // Automatically search for recipes after adding an ingredient
    searchRecipes();
  }
});

// Event listener for the form submission
document.getElementById("ingredientForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  if (ingredients.length === 0) {
    alert("Please add at least one ingredient");
    return;
  }

  searchRecipes();
});

// Function to search for recipes using Spoonacular API
async function searchRecipes() {
  const recipeContainer = document.getElementById("recipeContainer");
  recipeContainer.innerHTML = "<p>Loading recipes...</p>";

  try {
    const ingredientsList = ingredients.join(",");
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredientsList}&apiKey=5e4492ea0f0443dc849b3ccd5e1864a6`);
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    if (data.length > 0) {
      recipeContainer.innerHTML = data.map(recipe => `
        <div class="recipe">
          <h3>${recipe.title}</h3>
          <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
          <button onclick="viewRecipe(${recipe.id})">View Recipe</button>
        </div>
      `).join("");
    } else {
      recipeContainer.innerHTML = "<p>No recipes found with all ingredients. Try different ingredients.</p>";
    }
    
  } catch (error) {
    console.error("Error fetching recipes:", error);
    recipeContainer.innerHTML = "<p>Sorry, something went wrong. Please try again.</p>";
  }
}

// Function to fetch and display the full recipe details in a modal
async function viewRecipe(recipeId) {
  const modal = document.getElementById("recipeModal");
  const modalContent = document.getElementById("modalContent");

  modalContent.innerHTML = "<p>Loading recipe details...</p>";
  modal.style.display = "block";

  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=5e4492ea0f0443dc849b3ccd5e1864a6`);
    const recipe = await response.json();

    modalContent.innerHTML = `
      <h2>${recipe.title}</h2>
      <img src="${recipe.image}" alt="${recipe.title}" class="modal-img">
      <h3>Ingredients</h3>
      <ul>
        ${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join("")}
      </ul>
      <h3>Instructions</h3>
      <p>${recipe.instructions || "No instructions available"}</p>
      <button onclick="closeModal()">Close</button>
    `;

  } catch (error) {
    console.error("Error fetching recipe details:", error);
    modalContent.innerHTML = "<p>Sorry, something went wrong. Please try again.</p>";
  }
}

// Function to close the modal
function closeModal() {
  const modal = document.getElementById("recipeModal");
  modal.style.display = "none";
}

// Function to update the displayed list of ingredients
function updateIngredientsList() {
  const ingredientsList = document.getElementById("ingredientsList");
  ingredientsList.innerHTML = ingredients.map(ingredient => `<span class="ingredient-tag">${ingredient}</span>`).join("");
}

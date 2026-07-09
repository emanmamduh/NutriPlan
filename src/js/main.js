/**
 * NutriPlan - Main Entry Point
 *
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

// *====================== Data =============================
// * Side Navigation Bar Elements
const navList = document.querySelector(".navList");
const navListItems = document.querySelectorAll("ul a");
const sectionsList = document.querySelectorAll("section");
const navigationsData = {
  meals: {
    header: " Meals & Recipes",
    desc: "Discover delicious and nutritious recipes tailored for you",
    visibleSections: [
      "search-filters-section",
      "meal-categories-section",
      "all-recipes-section",
    ],
  },
  "product-scanner": {
    header: " Product Scanner",
    desc: "Search packaged foods by name or barcode",
    visibleSections: ["products-section"],
  },
  "food-log": {
    header: "Food Log",
    desc: "Track your daily nutrition and food intake",
    visibleSections: ["foodlog-section"],
  },
  "meal-page": {
    header: "Recipe Details",
    desc: "View full recipe information and nutrition facts",
    visibleSections: ["meal-details"],
  },
};
// *******************************************************
// *******************************************************
// *Home Page Elements
const sectionHeader = document.querySelector("#main-content header h1");
const sectionHeaderDesc = document.querySelector("#main-content header p");
const homePageSections = document.querySelectorAll(".home-page");
const searchBar = document.getElementById("search-input");
const loadingOverLay = document.getElementById("app-loading-overlay");
const categoriesGrid = document.getElementById("categories-grid");
const recipesGrid = document.getElementById("recipes-grid");
const searchInput = document.getElementById("search-input");
const recipesCount = document.getElementById("recipes-count");
const allAreas = document.querySelector("#all-areas");
// *grid btn
const viewToggleBtnsList = document.querySelectorAll("#view-toggle button");
const viewToggleBtns = document.querySelector("#view-toggle");
// *******************************************************
// * Meal Page Elements
const mealpage = document.getElementById("meal-details");
const loadingsList = document.querySelectorAll(".loشding-value");
const logMealBtn = document.getElementById("log-meal-btn");
const mealImg = document.getElementById("meal-img");
const catgryLabel = document.getElementById("catgryLabel");
const areaLabel = document.getElementById("areaLabel");
const tags = document.getElementById("tags");
const mealTitle = document.getElementById("mealTitle");
const prepTime = document.getElementById("prepTime");
const servings = document.getElementById("hero-servings");
const calories = document.getElementById("hero-calories");
const ingredientCount = document.getElementById("ingredientCount");
const ingredientCard = document.querySelector(".ingredient-cards");
const instructionCard = document.getElementById("instructions-List");
const mealVideo = document.getElementById("mealVideo");
const caloriesPerServing = document.getElementById("Calories-per-serving");
const totalCalories = document.getElementById("total-calories");
const proteinVal = document.getElementById("proteinVal");
const carbsVal = document.getElementById("carbsVal");
const fatVal = document.getElementById("fatVal");
const fiberVal = document.getElementById("fiberVal");
const sugarVal = document.getElementById("sugarVal");
const VitaminA = document.getElementById("VitaminA");
const VitaminC = document.getElementById("VitaminC");
const calciumPercentage = document.getElementById("calciumPercentage");
const ironPercentage = document.getElementById("ironPercentage");
// *******************************************************
// * product Page Elements
const productCategories = document.getElementById("product-categories");
const productsGrid = document.getElementById("products-grid");
const productSearchInput = document.getElementById("product-search-input");
const barcodeInput = document.getElementById("barcode-input");
const searchBtn = document.getElementById("search-product-btn");
const lookUpBtn = document.getElementById("lookup-barcode-btn");
const productCard = document.querySelector(".product-card");
const productCardLogBtn = document.querySelector(".add-product-to-log");
// ********************************************************
// * Lists
let mealsList;
let categoriesList;
let areasList;
let filteredMealsList;
// *******************************************************
navList.addEventListener("click", function (eventInfo) {
  const targetLink = eventInfo.target.closest("a");
  if (!targetLink) return;
  navListItems.forEach((link) => {
    link.classList.remove("bg-emerald-50", "text-emerald-700");
    link.classList.add("text-gray-600", "hover:bg-gray-50");
  });
  targetLink.classList.remove("text-gray-600", "hover:bg-gray-50");
  targetLink.classList.add("bg-emerald-50", "text-emerald-700");

  const navigatedPage = navigationsData[targetLink.id];
  if (navigatedPage) {
    sectionHeader.innerText = navigatedPage.header;
    sectionHeaderDesc.innerText = navigatedPage.desc;

    sectionsList.forEach((section) => {
      if (navigatedPage.visibleSections.includes(section.id)) {
        section.classList.remove("hidden");
      } else {
        section.classList.add("hidden");
      }
    });
  }
});
viewToggleBtns.addEventListener("click", function (eventInfo) {
  let targetBtn = eventInfo.target.closest("button");
  viewToggleBtnsList.forEach((b) => {
    b.classList.remove("bg-white", "rounded-md", "shadow-sm");
  });
  targetBtn.classList.add("bg-white", "rounded-md", "shadow-sm");

  if (targetBtn.id === "list-view-btn") {
    recipesGrid.classList.remove("grid-cols-4");
    recipesGrid.classList.add("grid-cols-2");
  } else {
    if (recipesGrid.classList.contains("grid-cols-2")) {
      recipesGrid.classList.remove("grid-cols-2");
      recipesGrid.classList.add("grid-cols-4");
    }
  }
});
async function getMeals() {
  try {
    loadingOverLay.style.display = "flex";
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/search?q=chicken&page=1&limit=25`,
    );
    const data = await response.json();
    mealsList = data.results;
    setTimeout(() => {
      loadingOverLay.style.display = "none";
    }, 1000);
    displayMeals(mealsList);
  } catch (error) {
    console.log(error);
  }
}
function displayMeals(list) {
  let mealsContainer = "";
  for (let i = 0; i < list.length; i++) {
    mealsContainer += `         <div
              class="recipe-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
              data-meal-id="${list[i].id}">
              <div class="relative h-48 overflow-hidden">
                <img
                  class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  src="${list[i].thumbnail}"
                  alt="Teriyaki Chicken Casserole"
                  loading="lazy"
                />
                <div class="absolute bottom-3 left-3 flex gap-2">
                  <span
                    class="px-2 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold rounded-full text-gray-700"
                  >
                    ${list[i].category}
                  </span>
                  <span
                    class="px-2 py-1 bg-emerald-500 text-xs font-semibold rounded-full text-white"
                  >
                    ${list[i].area}
                  </span>
                </div>
              </div>
              <div class="p-4">
                <h3
                  class="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors line-clamp-1"
                >
                  ${list[i].name}
                </h3>
                <p class="text-xs text-gray-600 mb-3 line-clamp-2">
                  ${list[i].instructions[0]}
                </p>
                <div class="flex items-center justify-between text-xs">
                  <span class="font-semibold text-gray-900">
                    <i class="fa-solid fa-utensils text-emerald-600 mr-1"></i>
                    ${list[i].area}
                  </span>
                  <span class="font-semibold text-gray-500">
                    <i class="fa-solid fa-globe text-blue-500 mr-1"></i>
                   ${list[i].area}
                  </span>
                </div>
              </div>
            </div>`;
  }
  recipesCount.innerText = `Showing ${list.length} recipes`;

  recipesGrid.innerHTML = mealsContainer;
}
function displayAllAreas(list) {
  let areasContainer = "";
  for (let i = 0; i < 10; i++) {
    areasContainer += `<button
              class="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium text-sm whitespace-nowrap hover:bg-gray-200 transition-all"
            >
              ${list[i].name}
            </button>`;
  }
  allAreas.innerHTML += areasContainer;
}
async function getAllAreas() {
  try {
    const response = await fetch(
      "https://nutriplan-api.vercel.app/api/meals/areas",
    );
    // destructing results from response
    // const { results } = await response.json();
    const areasResponse = await response.json();
    areasList = areasResponse.results;
    displayAllAreas(areasList);
  } catch (error) {
    console.log(error);
  }
}
async function getAllCategories() {
  try {
    const response = await fetch(
      "https://nutriplan-api.vercel.app/api/meals/categories",
    );
    // destructing results from response
    // const { results } = await response.json();
    const categoriesResponse = await response.json();
    categoriesList = categoriesResponse.results;
    displayCategories(categoriesList, categoriesGrid);
  } catch (error) {
    console.log(error);
  }
}
function displayCategories(list) {
  for (let i = 0; i < 12; i++) {
    categoriesGrid.innerHTML += `            <div
              class="category-card bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-3 border border-emerald-200 hover:border-emerald-400 hover:shadow-md cursor-pointer transition-all group"
              data-category="${list[i].name}">
              <div class="flex items-center gap-2.5">
                <div
                  class="text-white w-9 h-9 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm"
                >
                  <i class="fa-solid fa-drumstick-bite"></i>
                </div>
                <div>
                  <h3 class="text-sm font-bold text-gray-900">${list[i].name}</h3>
                </div>
              </div>
            </div>`;
  }
}
async function filterMeals(mealCategory, area) {
  console.log(mealCategory);

  try {
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/filter?category=${mealCategory}&area=${area}&page=1&limit=20`,
    );

    const mealsResponse = await response.json();
    filteredMealsList = mealsResponse.results;
    if (filteredMealsList.length !== 0) {
      console.log(filteredMealsList);
      displayMeals(filteredMealsList);
    } else {
      recipesCount.innerText = `Showing ${filteredMealsList.length}  ${area} recipes `;
      recipesGrid.innerHTML = `<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>`;
    }
  } catch (error) {
    console.log(error);
  }
}
categoriesGrid.addEventListener("click", function (eventInfo) {
  let targetCatgry = eventInfo.target.closest(".category-card");
  let selectedCatgry = targetCatgry.getAttribute("data-category");
  filterMeals(selectedCatgry, "");
});
allAreas.addEventListener("click", function (eventInfo) {
  let targetArea = eventInfo.target.closest("button");
  let selectedArea = targetArea.innerText;
  console.log(selectedArea);

  const areaBtns = allAreas.querySelectorAll("button");
  areaBtns.forEach((item) => {
    item.classList.remove(
      "bg-emerald-600",
      "hover:bg-emerald-700",
      "text-white",
    );
    item.classList.add("bg-gray-100", "hover:bg-gray-200", "text-gray-700");
  });

  targetArea.classList.remove(
    "bg-gray-100",
    "hover:bg-gray-200",
    "text-gray-700",
  );

  targetArea.classList.add(
    "bg-emerald-600",
    "hover:bg-emerald-700",
    "text-white",
  );

  if (selectedArea === "All Recipes") {
    getMeals();
  } else {
    filterMeals("", selectedArea);
  }
});
async function displaySpecificMeal(meal) {
  let ingredientsContainer = "";
  let instructionsContainer = "";
  mealImg.src = meal.thumbnail;
  catgryLabel.innerText = meal.category;
  areaLabel.innerText = meal.area;
  mealTitle.innerText = meal.name;
  prepTime.innerText = "30 min";
  ingredientCount.innerText = meal.ingredients.length + " items";
  mealVideo.src = meal.youtube;

  if (meal.tags !== 0) {
    for (let i = 0; i < meal.tags.length; i++) {
      tags.innerHTML += ` <span
                    class="px-3 py-1 bg-purple-500 text-white text-sm font-semibold rounded-full"
                    >${meal.tags[i]}</span>`;
    }
  }

  for (let i = 0; i < meal.ingredients.length; i++) {
    ingredientsContainer += `
                  <div
                    class=" flex items-center gap-3 p-3 bg-gray-50 rounded-xl 
                    hover:bg-emerald-50 transition-colors">
                    <input
                      type="checkbox"
                      class="ingredient-checkbox w-5 h-5 text-emerald-600 rounded border-gray-300"
                    />
                    <span class="text-gray-700">
                      <span class="font-medium text-gray-900">${meal.ingredients[i].measure}</span>
                       ${meal.ingredients[i].ingredient}
                    </span>
                       </div>
                  `;
  }
  ingredientCard.innerHTML = ingredientsContainer;

  for (let i = 0; i < meal.instructions.length; i++) {
    instructionsContainer += ` <div
                    class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div
                      class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                      ${i + 1}
                    </div>
                    <p class="text-gray-700 leading-relaxed pt-2">
                      ${meal.instructions[i]}
                    </p>
                  </div>
                  `;
  }
  instructionCard.innerHTML = instructionsContainer;
}
async function getNutriValues(meal) {
  let ingredientsList = meal.ingredients.map((item) => {
    return `${item.measure} ${item.ingredient}`.trim();
  });
  let SpecificRecipeDetails = {
    recipeName: `${meal.name}`,
    ingredients: ingredientsList,
  };
  try {
    //  loadingsList.forEach(item => {
    //   item.innerHTML = "loading..."
    //  });
    calories.innerText = "loading...";
    caloriesPerServing.innerText = "loading...";
    totalCalories.innerText = "loading...";
    proteinVal.innerText = "loading...";
    carbsVal.innerText = "loading...";
    fatVal.innerText = "loading...";
    fiberVal.innerText = "loading...";
    sugarVal.innerText = "loading...";
    calories.innerText = "loading...";
    const response = await fetch(
      "https://nutriplan-api.vercel.app/api/nutrition/analyze",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "ibW4pzth1z7MGHHtsBjAzqbbAzSebtiljuXfOerZ",
        },
        body: JSON.stringify(SpecificRecipeDetails),
      },
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const nutriData = await response.json();
    const { data } = nutriData;
    console.log(data);

    displayMealNutriValues(data);
  } catch (error) {
    console.log(error);
  }
}
function displayMealNutriValues(meal) {
  servings.innerText = meal.servings + " servings";
  calories.innerText = meal.perServing.calories + " cal/serving";
  caloriesPerServing.innerText = meal.perServing.calories;
  totalCalories.innerText = "Total: " + meal.totals.calories;
  proteinVal.innerText = "Total: " + meal.perServing.protein + "g";
  carbsVal.innerText = "Total: " + meal.perServing.carbs + "g";
  fatVal.innerText = "Total: " + meal.perServing.fat + "g";
  fiberVal.innerText = "Total: " + meal.perServing.fiber + "g";
  sugarVal.innerText = "Total: " + meal.perServing.sugar + "g";
}
async function getMealById(id) {
  try {
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/${id}`,
    );
    const data = await response.json();
    const { result } = data;
    displaySpecificMeal(result);
    getNutriValues(result);
  } catch (error) {
    console.log(error);
  }
}
recipesGrid.addEventListener("click", function (eventInfo) {
  let targetMeal = eventInfo.target.closest(".recipe-card");
  let mealId = targetMeal.getAttribute("data-meal-id");
  homePageSections.forEach((section) => {
    section.classList.add("hidden");
  });
  mealpage.classList.remove("hidden");
  sectionHeader.innerText = navigationsData["meal-page"].header;
  sectionHeaderDesc.innerText = navigationsData["meal-page"].desc;
  console.log(mealId);
  getMealById(mealId);
});
searchBar.addEventListener("keyup", async function (eventInfo) {
  try {
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/meals/search?q=${searchBar.value}&page=1&limit=60`,
    );
    let data = await response.json();
    displayMeals(data.results);
  } catch (error) {
    console.log(error);
  }
});
logMealBtn.addEventListener("click", () => {
  console.log("log btn meal page");
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Meal Logged",
    text: "Meal has been added to your daily log",
    showConfirmButton: false,
    timer: 1500,
  });
});
// ******************************************************************
// * product Page
function displayProduct(product) {
  let productsGridContainer = "";
  productsGrid.innerHTML = `              <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${product.barcode}" ,
                data-brand="${product.brand}"
                data-name="${product.name}"
                data-image="${product.image}"
                data-calories="${product.nutrients.calories}g"
                data-protein="${product.nutrients.protein}g"
                data-carbs="${product.nutrients.carbs}g"
                data-fat="${product.nutrients.fat}g"
                data-sugar="${product.nutrients.sugar}g"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${product.image}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  ${
                    product.nutritionGrade
                      ? `<div class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase">
                        Nutri-Score ${
                          product.nutritionGrade
                            ? product.nutritionGrade.toUpperCase()
                            : "a"
                        }
                      </div>`
                      : " "
                  }

                  <!-- NOVA Badge -->
                  ${
                    product.novaGroup
                      ? `<div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA ${product.novaGroup}">
                    ${product.novaGroup}
                  </div> `
                      : " "
                  }
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                   ${product.brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${product.name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>350 kcal/${product.nutrients.calories}g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${product.nutrients.protein}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${product.nutrients.carbs}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${product.nutrients.fat}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${product.nutrients.sugar}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;
}
searchBtn.addEventListener("click", async () => {
  let searchedProduct = productSearchInput.value;
  if (!searchedProduct) return;

  console.log(searchedProduct);
  try {
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/products/search?q=${searchedProduct}&page=1&limit=24`,
    );
    let data = await response.json();
    console.log(data);
    displayProducts(data.results);
  } catch (error) {
    console.log(error);
  }
});
lookUpBtn.addEventListener("click", async () => {
  let searchedProduct = barcodeInput.value;
  if (!searchedProduct) return;
  try {
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/products/barcode/${searchedProduct}`,
    );
    let data = await response.json();
    if (data) {
      displayProduct(data.result);
    }
  } catch (error) {
    console.log(error);
    productsGrid.innerHTML = showEmptySearch();
  }
});
function showEmptySearch() {
  return `<div id="products-empty" class="py-12">
                    <div class="text-center">
                        <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <i class="text-3xl text-gray-400" data-fa-i2svg=""><svg class="svg-inline--fa fa-box-open" data-prefix="fas" data-icon="box-open" role="img" viewBox="0 0 640 512" aria-hidden="true" data-fa-i2svg=""><path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z"></path></svg></i>
                        </div>
                        <p class="text-gray-500 text-lg mb-2">No products to display</p>
                        <p class="text-gray-400 text-sm">Search for a product or browse by category</p>
                    </div>
                </div>`;
}
function displayProductsCategories(list) {
  for (let i = 0; i < 10; i++) {
    productCategories.innerHTML += `               <button
                class="product-category-btn px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium whitespace-nowrap hover:bg-emerald-200 transition-all"
              >
                <i class="fa-solid fa-cookie mr-1.5"></i>${list[i].name}
              </button>`;
  }
}
async function getProductCatgries() {
  try {
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/products/categories`,
    );
    const data = await response.json();
    const { results } = data;
    displayProductsCategories(results);
  } catch (error) {
    console.log(error);
  }
}
function displayProducts(list) {
  let productsGridContainer = "";
  if (list.length === 0) {
    productsGrid.innerHTML = showEmptySearch();
    return;
  }
  for (let i = 0; i < list.length; i++) {
    productsGridContainer += `              <div
                class="product-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group"
                data-barcode="${list[i].barcode}" ,
                data-brand="${list[i].brand}"
                data-name="${list[i].name}"
                data-image="${list[i].image}"
                data-calories="${list[i].nutrients.calories}g"
                data-protein="${list[i].nutrients.protein}g"
                data-carbs="${list[i].nutrients.carbs}g"
                data-fat="${list[i].nutrients.fat}g"
                data-sugar="${list[i].nutrients.sugar}g"
              >
                <div
                  class="relative h-40 bg-gray-100 flex items-center justify-center overflow-hidden"
                >
                  <img
                    class="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src="${list[i].image}"
                    alt="Product Name"
                    loading="lazy"
                  />

                  <!-- Nutri-Score Badge -->
                  <div
                    class="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded uppercase"
                  >
                    Nutri-Score ${list[i].nutritionGrade.toUpperCase()}
                  </div>

                  <!-- NOVA Badge -->
                  <div
                    class="absolute top-2 right-2 bg-lime-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center"
                    title="NOVA ${list[i].novaGroup}"
                  >
                    ${list[i].novaGroup}
                  </div>
                </div>

                <div class="p-4">
                  <p
                    class="text-xs text-emerald-600 font-semibold mb-1 truncate"
                  >
                   ${list[i].brand}
                  </p>
                  <h3
                    class="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-emerald-600 transition-colors"
                  >
                    ${list[i].name}
                  </h3>

                  <div
                    class="flex items-center gap-3 text-xs text-gray-500 mb-3"
                  >
                    <span
                      ><i class="fa-solid fa-weight-scale mr-1"></i>250g</span
                    >
                    <span
                      ><i class="fa-solid fa-fire mr-1"></i>350 kcal/${list[i].nutrients.calories}g</span
                    >
                  </div>

                  <!-- Mini Nutrition -->
                  <div class="grid grid-cols-4 gap-1 text-center">
                    <div class="bg-emerald-50 rounded p-1.5">
                      <p class="text-xs font-bold text-emerald-700">${list[i].nutrients.protein}g</p>
                      <p class="text-[10px] text-gray-500">Protein</p>
                    </div>
                    <div class="bg-blue-50 rounded p-1.5">
                      <p class="text-xs font-bold text-blue-700">${list[i].nutrients.carbs}g</p>
                      <p class="text-[10px] text-gray-500">Carbs</p>
                    </div>
                    <div class="bg-purple-50 rounded p-1.5">
                      <p class="text-xs font-bold text-purple-700">${list[i].nutrients.fat}g</p>
                      <p class="text-[10px] text-gray-500">Fat</p>
                    </div>
                    <div class="bg-orange-50 rounded p-1.5">
                      <p class="text-xs font-bold text-orange-700">${list[i].nutrients.sugar}g</p>
                      <p class="text-[10px] text-gray-500">Sugar</p>
                    </div>
                  </div>
                </div>
              </div>`;
  }
  productsGrid.innerHTML = productsGridContainer;
}
productCategories.addEventListener("click", async (eventInfo) => {
  let targetCatgry = eventInfo.target.closest("button");
  let selectedCatgry = targetCatgry.innerText.toLowerCase();
  if (!targetCatgry) return;
  try {
    const response = await fetch(
      `https://nutriplan-api.vercel.app/api/products/category/${selectedCatgry}`,
    );
    const data = await response.json();
    const { results } = data;
    displayProducts(results);
  } catch (error) {
    console.log(error);
  }
});
function showProductCard(product) {
  document.getElementById("modal-img").src = product.getAttribute("data-image");
  document.getElementById("modal-img").alt = product.getAttribute("data-name");
  document.getElementById("modal-brand").innerText =
    product.getAttribute("data-brand");
  document.getElementById("modal-name").innerText =
    product.getAttribute("data-name");
  document.getElementById("modal-calories").innerText =
    product.getAttribute("data-calories");
  document.getElementById("modal-protein").innerText =
    product.getAttribute("data-protein");
  document.getElementById("modal-carbs").innerText =
    product.getAttribute("data-carbs");
  document.getElementById("modal-fat").innerText =
    product.getAttribute("data-fat");
  document.getElementById("modal-sugar").innerText =
    product.getAttribute("data-sugar");
}
productsGrid.addEventListener("click", (eventInfo) => {
  const targetCard = eventInfo.target.closest(".product-card");
  if (!targetCard) return;
  showProductCard(targetCard);
  productModal.classList.remove("hidden");
});
document.querySelectorAll(".close-product-modal").forEach((button) => {
  button.addEventListener("click", (e) => {
    productModal.classList.add("hidden");
  });
});
productModal.addEventListener("click", (e) => {
  if (e.target === productModal) {
    productModal.classList.add("hidden");
  }
});
productCardLogBtn.addEventListener("click", () => {
  console.log("log card btn");
  productModal.classList.add("hidden");
  Swal.fire({
    position: "center",
    icon: "success",
    title: "This product logged in your daily intake",
    showConfirmButton: false,
    timer: 1500,
  });
});
// * Functions Calls
// ==================== Home page Section =================//
getMeals();
getAllAreas();
getAllCategories();
// ====================================================//
// ====================  page Section =================//
getProductCatgries();

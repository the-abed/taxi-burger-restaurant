const loadCategories = ()=>{
    const url = " https://taxi-kitchen-api.vercel.app/api/v1/categories"
    fetch(url)
    .then(res => res.json())
    .then(data => displayCategories(data.categories));
}

const loadFoods = (id)=>{
    const url = `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayFoodByCategory(data.foods)); 
    }

//     {
// "id": 52879,
// "title": "Chicken Parmentier",
// "catId": 2,
// "foodImg": "https://www.themealdb.com/images/media/meals/uwvxpv1511557015.jpg",
// "price": 409,
// "category": "Chicken"
// },
const displayFoodByCategory = (items)=>{
    const foodContainer = document.getElementById("food-container");
    foodContainer.innerHTML="";
    items.map(item => {
        const foodCard = document.createElement('div')
        foodCard.innerHTML =`
        <div class="p-5 bg-white flex gap-3 shadow rounded-xl">
            <div class="img flex-1">
              <img
                src="${item.foodImg}"
                alt=""
                class="w-[160px] rounded-xl h-[160px] object-cover"
              />
            </div>
            <div class="flex-2">
              <h1 class="text-xl font-bold">
                ${item.title}
              </h1>

              <div class="badge badge-warning">${item.category} </div>

              <div class="divider divider-end">
                <h2 class="text-yellow-600 font-semibold">
                  $ <span class="price"> ${item.price} </span> BDT
                </h2>
              </div>

              <button class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>`
          foodContainer.appendChild(foodCard)
    }
)
    
}

const displayCategories = (categories) =>{
    
    const categoryContainer = document.getElementById('category-container');
    categoryContainer.innerHTML='';
    
   for(let category of categories){
    const createCategoryCard = document.createElement('div')
    createCategoryCard.innerHTML = `
    <button onclick = "loadFoods(${category.id})" class="btn btn-block shadow btn-category">
            <img
              src="${category.categoryImg}"
              alt=""
              class="w-10"
            />${category.categoryName}
          </button>
    `
    categoryContainer.appendChild(createCategoryCard);
   }
        
    
}
loadCategories()

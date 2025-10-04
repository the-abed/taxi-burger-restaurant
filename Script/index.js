const loadCategories = () => {
  const url = " https://taxi-kitchen-api.vercel.app/api/v1/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories));
};

const loadFoods = (id) => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/categories/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayFoodByCategory(data.foods));

  const btns = document.querySelectorAll(".btn-category");
  btns.forEach((btn) => btn.classList.remove("active"));

  const currentBtn = document.getElementById(`cat-btn-${id}`);
  currentBtn.classList.add("active");
};
const loadFoodDetails = (id) => {
  const url = ` https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showFoodDetails(data.details));
};

const showFoodDetails = (detail) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
     <h2 class="text-2xl font-bold">${detail.title}</h2>
        <img class="rounded-lg my-3" src="${detail.foodImg}" alt="">
        <div class="flex gap-3 items-center">
            <h2 class="font-bold bg-yellow-400 p-2 rounded-md w-fit">${detail.area}</h2>
        <a class="btn btn-accent" href="${detail.video}">Watch Video</a>
        </div>
    </div>
    `;
  document.getElementById("my_modal_3").showModal();
};
const loadCart = (id) => {
  const url = `https://taxi-kitchen-api.vercel.app/api/v1/foods/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showCart(data.details));
};
let cartItem = [];
let total = 0;

const showCart = (item) => {
  cartItem.push(item);

  const cartContainer = document.getElementById("cart-container");

  const cart = document.createElement("div");
  cart.classList.add("cart-entry"); // for targeting later
  cart.innerHTML = `
    <div class="p-3 shadow-md rounded-md flex justify-between items-center">
        <div class="flex gap-3 items-center">
            <img width="48px" class="rounded-lg" src="${item.foodImg}" alt="">
            <div>
                <h2 class="text-lg font-bold food-title">${item.title}</h2> 
                <h2 class="text-yellow-500">$ ${item.price}</h2>
            </div>
        </div>
        <div onclick="remove(this, '${item.title}', ${item.price})" class="btn">
            <span>❌</span>
        </div>
    </div>`;

  cartContainer.appendChild(cart);

  total += item.price;
  showTotal(total);
  console.log("cart item is ", cartItem);
};

const showTotal = (value) => {
  document.getElementById("cart-total").innerHTML = value;
};

const remove = (btn, title, price) => {
  // remove from array
  cartItem = cartItem.filter((i) => i.title !== title);

  // update total
  total -= price;
  showTotal(total);

  // remove DOM element
  const cartDiv = btn.closest(".cart-entry");
  if (cartDiv) {
    cartDiv.remove();
  }

  console.log("Updated cart item is ", cartItem);
};

// let cartItem = [];
// let total = 0
// const showCart = (item) =>{
//     cartItem.push(item);
//     const cartContainer = document.getElementById('cart-container')

//     const cart = document.createElement('div');
//     cart.innerHTML = `
//     <div class="p-3 shadow-md rounded-md">
//         <div class="flex gap-3 items-center">
//             <img width="48px" class="rounded-lg"
//              src="${item.foodImg}" alt="">

//             <div class="flex justify-between gap-2 items-center">
//             <div>
//             <h2 class="text-lg font-bold space-y-2 food-title">${item.title} </h2>
//                 <h2 class="text-yellow-500">$ ${item.price} </h2>
//             </div>

//             </div>

//             <div onclick="remove(this)" class="btn">
//             <span> ❌ </span>
//             </div>

//           </div>`
//     cartContainer.appendChild(cart);
//     let price = item.price;
//     total = total + price;
//     showTotal(total);
//     console.log("cart item is ", cartItem);

// }
// const showTotal = (value)=>{
//    document.getElementById('cart-total').innerHTML = value;
// }
// const remove = (btn) =>{
//     const item = btn.parentNode;
//     const foodTitle = item.querySelector(".food-title").innerText;
//     cartItem = cartItem.filter(i => i.title !== foodTitle);
//     showCart(cartItem);

//     // console.log(foodTitle);

// }
const displayFoodByCategory = (items) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  items.map((item) => {
    const foodCard = document.createElement("div");
    foodCard.innerHTML = `
        <div 
         class="p-5 bg-white flex gap-3 shadow rounded-xl">
            <div class="img flex-1">
              <img
              onclick = "loadFoodDetails(${item.id})"
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

              <button onclick="loadCart(${item.id})" class="btn btn-warning">
                <i class="fa-solid fa-square-plus"></i>
                Add This Item
              </button>
            </div>
          </div>`;
    foodContainer.appendChild(foodCard);
  });
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  for (let category of categories) {
    const createCategoryCard = document.createElement("div");
    createCategoryCard.innerHTML = `
    <button id="cat-btn-${category.id}" onclick = "loadFoods(${category.id})" class="btn btn-block shadow btn-category">
            <img
              src="${category.categoryImg}"
              alt=""
              class="w-10"
            />${category.categoryName}
          </button>
    `;
    categoryContainer.appendChild(createCategoryCard);
  }
};
loadCategories();
loadFoods(11);

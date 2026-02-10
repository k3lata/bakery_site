document.addEventListener("DOMContentLoaded", () => {
  const products = [
    {
      id: 1,
      title: "Торт “Ваниль-ягода”",
      description: "Нежный крем + ягодная прослойка.",
      price: 8900,
      image: "../images/berryCake.jpg"
    },
    {
      id: 2,
      title: "Капкейки “Карамель”",
      description: "Солёная карамель и крем-шапка.",
      price: 1300,
      image: "../images/cupcake.jpg"
    },
    {
      id: 3,
      title: "Пончики “Глазурь”",
      description: "Мягкие, с лёгкой ванилью.",
      price: 900,
      image: "../images/donuts.jpg"
    },
    {
      id: 4,
      title: "Брауни “Шоколад”",
      description: "Плотный шоколадный вкус.",
      price: 1500,
      image: "../images/brownie.jpg"
    },
    {
      id: 5,
      title: "Лимонный тарт",
      description: "Кислинка + хрустящая основа.",
      price: 2300,
      image: "../images/lemonTarts.jpg"
    },
    {
      id: 6,
      title: "Чизкейк “Клубника”",
      description: "Сливочный, ягодный, нежный.",
      price: 2700,
      image: "../images/strawberryCheesecake.jpg"
    }
  ];

  const grid = document.getElementById("catalog-grid");
  if (!grid) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function createCard(p) {
    const card = document.createElement("article");
    card.className = "card";

    card.innerHTML = `
      <div class="card__media">
        <img src="${p.image}" alt="${p.title}">
      </div>

      <div class="card__body">
        <h3 class="card__title">${p.title}</h3>
        <p class="card__text">${p.description}</p>

        <div class="card__meta">
          <span class="price">${p.price.toLocaleString()} ₸</span>
          <button type="button" class="btn btn--small">В корзину</button>
        </div>
      </div>
    `;

    card.querySelector("button").addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(p);
    });
    

    return card;
  }

  function render() {
    grid.innerHTML = "";
    products.forEach(p => grid.appendChild(createCard(p)));
  }

  function addToCart(product) {
    const item = cart.find(i => i.id === product.id);
    if (item) {
      item.qty++;
    } else {
      cart.push({ ...product, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  render();
});

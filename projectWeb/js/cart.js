document.addEventListener("DOMContentLoaded", () => {
  const itemsContainer = document.getElementById("cart-items");
  const emptyState = document.getElementById("empty-state");
  const totalCountEl = document.getElementById("total-count");
  const totalPriceEl = document.getElementById("total-price");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function save() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function render() {
    itemsContainer.innerHTML = "";

    if (cart.length === 0) {
      emptyState.style.display = "grid";
      totalCountEl.textContent = "0";
      totalPriceEl.textContent = "0 ₸";
      return;
    }

    emptyState.style.display = "none";

    let count = 0;
    let price = 0;

    cart.forEach(item => {
      count += item.qty;
      price += item.qty * item.price;

      const row = document.createElement("div");
      row.className = "cartItem";

      row.innerHTML = `
        <div class="cartItem__left">
          <div class="cartItem__thumb">
            <img src="${item.image}" alt="${item.title}">
          </div>
          <div class="cartItem__info">
            <div class="cartItem__name">${item.title}</div>
            <div class="qty">
              <button type="button" class="qty__btn" data-action="minus" data-id="${item.id}">−</button>
              <span class="qty__value">${item.qty}</span>
              <button type="button" class="qty__btn" data-action="plus" data-id="${item.id}">+</button>
            </div>
          </div>
        </div>

        <div class="cartItem__right">
          <div class="price">${item.price.toLocaleString()} ₸</div>
          <button type="button" class="iconBtn cartItem__remove" data-id="${item.id}">✖</button>
        </div>
      `;

      itemsContainer.appendChild(row);
    });

    totalCountEl.textContent = count;
    totalPriceEl.textContent = price.toLocaleString() + " ₸";
  }

  document.addEventListener("click", (e) => {
    const removeBtn = e.target.closest(".cartItem__remove");
    const qtyBtn = e.target.closest(".qty__btn");

    if (removeBtn) {
      cart = cart.filter(i => i.id != removeBtn.dataset.id);
      save(); render();
      return;
    }

    if (qtyBtn) {
      const item = cart.find(i => i.id == qtyBtn.dataset.id);
      if (!item) return;

      if (qtyBtn.dataset.action === "plus") item.qty++;
      if (qtyBtn.dataset.action === "minus") {
        item.qty--;
        if (item.qty <= 0) {
          cart = cart.filter(i => i.id != item.id);
        }
      }

      save(); render();
    }
  });

  const checkoutBtn = document.getElementById("checkout-btn");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) return;

      alert("Спасибо за покупку! Заказ успешно оформлен.");

      cart = [];
      localStorage.removeItem("cart");

      render();
    });
  }


  render();
});

const products = [
  {
    id: 1,
    name: "Moonlit Crystal Hoops",
    type: "hoop",
    mood: "Clear sparkle",
    price: 34,
    badge: "New",
    img: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=85",
    desc: "Glossy hoop energy with tiny crystal shine for evening outfits."
  },
  {
    id: 2,
    name: "Blush Pearl Drops",
    type: "drop",
    mood: "Pearl pink",
    price: 38,
    badge: "Cute",
    img: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=85",
    desc: "Soft pearl drops made for birthdays, brunch, and satin looks."
  },
  {
    id: 3,
    name: "Stardust Studs",
    type: "stud",
    mood: "Tiny shine",
    price: 22,
    badge: "Daily",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=85",
    desc: "Small crystal studs for a clean, everyday sparkle stack."
  },
  {
    id: 4,
    name: "Ocean Aura Drops",
    type: "drop",
    mood: "Aqua blue",
    price: 42,
    badge: "Fresh",
    img: "https://images.unsplash.com/photo-1620656798579-1984d9e87df9?auto=format&fit=crop&w=800&q=85",
    desc: "Blue-toned crystal drops with cool mermaid shine."
  },
  {
    id: 5,
    name: "Lavender Dream Huggies",
    type: "hoop",
    mood: "Lilac glow",
    price: 31,
    badge: "Soft",
    img: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=85",
    desc: "Tiny huggies with lavender crystal accents and a light feel."
  },
  {
    id: 6,
    name: "Rose Quartz Kiss",
    type: "drop",
    mood: "Blush crystal",
    price: 36,
    badge: "Romantic",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=85",
    desc: "Pink crystal earrings with a soft romantic finish."
  },
  {
    id: 7,
    name: "Golden Hour Charms",
    type: "drop",
    mood: "Warm gold",
    price: 40,
    badge: "Glow",
    img: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?auto=format&fit=crop&w=800&q=85",
    desc: "Light-catching charms for golden makeup and festive outfits."
  },
  {
    id: 8,
    name: "Tiny Bow Crystal Studs",
    type: "stud",
    mood: "Coquette",
    price: 25,
    badge: "Sweet",
    img: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?auto=format&fit=crop&w=800&q=85",
    desc: "Cute bow-inspired studs for soft, pretty daily styling."
  },
  {
    id: 9,
    name: "Crystal Garden Hoops",
    type: "hoop",
    mood: "Garden mix",
    price: 44,
    badge: "Limited",
    img: "https://images.unsplash.com/photo-1531995811006-35cb42e1a022?auto=format&fit=crop&w=800&q=85",
    desc: "A playful hoop pair with mixed crystal color accents."
  },
  {
    id: 10,
    name: "Simo Signature Pair",
    type: "custom",
    mood: "Made for you",
    price: 48,
    badge: "Custom",
    img: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=800&q=85",
    desc: "A custom pair based on your outfit, color story, and metal finish."
  },
  {
    id: 11,
    name: "Frosted Crystal Climbers",
    type: "stud",
    mood: "Icy clear",
    price: 33,
    badge: "Chic",
    img: "https://images.unsplash.com/photo-1615655096345-61a54750068d?auto=format&fit=crop&w=800&q=85",
    desc: "Modern crystal climbers for a delicate ear-party look."
  },
  {
    id: 12,
    name: "Candy Prism Drops",
    type: "drop",
    mood: "Pastel rainbow",
    price: 45,
    badge: "Fun",
    img: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=85",
    desc: "A cheerful pastel pair with crystal candy-shop color."
  }
];

const cart = [];
const productGrid = document.querySelector("#productGrid");
const cartDrawer = document.querySelector("#cartDrawer");
const cartToggle = document.querySelector("#cartToggle");
const cartClose = document.querySelector("#cartClose");
const cartItems = document.querySelector("#cartItems");
const cartCount = document.querySelector("#cartCount");
const cartTotal = document.querySelector("#cartTotal");
const checkoutLink = document.querySelector("#checkoutLink");

function renderProducts(filter = "all") {
  const visibleProducts = filter === "all" ? products : products.filter((product) => product.type === filter);

  productGrid.innerHTML = visibleProducts.map((product) => `
    <article class="product-card" data-type="${product.type}">
      <div class="product-media">
        <img src="${product.img}" alt="${product.name}">
        <span class="product-badge">${product.badge}</span>
        <button class="icon-link wish-btn" type="button" aria-label="Save ${product.name}">
          <i data-lucide="heart"></i>
        </button>
      </div>
      <div class="product-body">
        <small>${product.mood}</small>
        <h3>${product.name}</h3>
        <p>${product.desc}</p>
        <div class="product-meta">
          <span class="price">$${product.price}</span>
          <button class="add-btn" type="button" data-add="${product.id}" aria-label="Add ${product.name} to cart">
            <i data-lucide="plus"></i>
          </button>
        </div>
      </div>
    </article>
  `).join("");

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function updateCart() {
  cartCount.textContent = cart.length;
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartTotal.textContent = `$${total}`;

  if (!cart.length) {
    cartItems.innerHTML = `<p class="empty-cart">Your bag is waiting for sparkle.</p>`;
  } else {
    cartItems.innerHTML = cart.map((item, index) => `
      <article class="cart-item">
        <img src="${item.img}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>$${item.price} · ${item.mood}</p>
        </div>
        <button class="icon-link" type="button" data-remove="${index}" aria-label="Remove ${item.name}">
          <i data-lucide="trash-2"></i>
        </button>
      </article>
    `).join("");
  }

  const orderText = cart.length
    ? `Hi Simo Crystal Co.! I want to order: ${cart.map((item) => item.name).join(", ")}. Estimated total: $${total}.`
    : "Hi Simo Crystal Co.! I want to ask about your crystal earrings.";

  checkoutLink.href = `https://www.instagram.com/simocrystal.co?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==&text=${encodeURIComponent(orderText)}`;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener("click", (event) => {
  const addButton = event.target.closest("[data-add]");
  const removeButton = event.target.closest("[data-remove]");
  const filterButton = event.target.closest("[data-filter]");
  const filterLink = event.target.closest("[data-filter-link]");
  const wishButton = event.target.closest(".wish-btn");

  if (addButton) {
    const product = products.find((item) => item.id === Number(addButton.dataset.add));
    cart.push(product);
    updateCart();
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
  }

  if (removeButton) {
    cart.splice(Number(removeButton.dataset.remove), 1);
    updateCart();
  }

  if (filterButton) {
    document.querySelectorAll("[data-filter]").forEach((button) => button.classList.remove("active"));
    filterButton.classList.add("active");
    renderProducts(filterButton.dataset.filter);
  }

  if (filterLink) {
    const nextFilter = filterLink.dataset.filterLink;
    const matchingButton = document.querySelector(`[data-filter="${nextFilter}"]`);
    if (matchingButton) {
      matchingButton.click();
    }
  }

  if (wishButton) {
    wishButton.classList.toggle("saved");
    wishButton.style.color = wishButton.classList.contains("saved") ? "#b64f87" : "";
  }
});

cartToggle.addEventListener("click", () => {
  cartDrawer.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
});

cartClose.addEventListener("click", () => {
  cartDrawer.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
});

const moodSelect = document.querySelector("#moodSelect");
const metalSelect = document.querySelector("#metalSelect");
const lengthRange = document.querySelector("#lengthRange");
const previewTitle = document.querySelector("#previewTitle");
const previewLength = document.querySelector("#previewLength");
const previewDrops = document.querySelectorAll(".earring-preview span");
const moodColors = {
  "Rose Quartz Blush": ["#f5a9c7", "#ffe1ed", "#ffe89b"],
  "Ocean Aura Blue": ["#8edbd1", "#bfe8ff", "#d7f4ef"],
  "Clear Stardust": ["#f9fbff", "#d9e2f2", "#ffe89b"],
  "Lavender Dream": ["#c7a9ff", "#f5d7ff", "#8edbd1"]
};

function updatePreview() {
  previewTitle.textContent = `${moodSelect.value} in ${metalSelect.value}`;
  previewLength.textContent = `${lengthRange.value} cm drop length`;
  const colors = moodColors[moodSelect.value];
  previewDrops.forEach((drop) => {
    drop.style.height = `${120 + Number(lengthRange.value) * 14}px`;
    drop.style.background = `radial-gradient(circle at 50% 12%, white 0 11px, transparent 12px), linear-gradient(to bottom, ${colors.join(", ")})`;
  });
}

document.querySelector("#builderForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const note = `Hi Simo Crystal Co.! I want a custom pair: ${moodSelect.value}, ${metalSelect.value}, ${lengthRange.value} cm drop length.`;
  window.open(`https://www.instagram.com/simocrystal.co?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==&text=${encodeURIComponent(note)}`, "_blank", "noreferrer");
});

[moodSelect, metalSelect, lengthRange].forEach((control) => control.addEventListener("input", updatePreview));

renderProducts();
updateCart();
updatePreview();

if (window.lucide) {
  window.lucide.createIcons();
}

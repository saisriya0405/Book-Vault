// Navigate to book detail
function goToBookDetail(bookId) {
  localStorage.setItem("selectedBook", bookId);
  window.location.href = "book.html";
}

// Navigate to category
function goToCategory(category) {
  localStorage.setItem("selectedCategory", category);
  window.location.href = "categoty.html";
}

// Add to cart
function addToCart(bookId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(bookId);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Book added to cart!");
}

// Update cart badge
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.querySelector(".cart-count");
  if (cartCount) {
    cartCount.innerText = cart.length;
  }
}

// Real-time search
function searchBooks() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".book-card");

  cards.forEach(card => {
    const title = card.querySelector(".book-title").innerText.toLowerCase();
    const author = card.querySelector(".book-author").innerText.toLowerCase();
    const visible = title.includes(input) || author.includes(input);
    card.style.display = visible ? "block" : "none";
  });
}

// Run on every page load
document.addEventListener("DOMContentLoaded", updateCartCount);
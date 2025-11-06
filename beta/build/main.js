document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("addToCartBtn");

  button.addEventListener("click", () => {
    button.disabled = true;
    button.classList.add("loading");
    button.innerHTML = '<span class="loader"></span> Adding...<span class="shimmer"></span>';

    setTimeout(() => {
      button.classList.remove("loading");
      button.classList.add("added");
      button.innerHTML = '<span class="checkmark"></span> Added!<span class="shimmer"></span>';

      setTimeout(() => {
        button.classList.remove("added");
        button.innerHTML = '<span class="btn-text">Add to Cart</span><span class="shimmer"></span>';
        button.disabled = false;
      }, 2500);
    }, 1500);
  });
});



/* quantity selector */
document.addEventListener("DOMContentLoaded", () => {
  const qtyDisplay = document.getElementById("qtyDisplay");
  const increaseBtn = document.getElementById("increaseQty");
  const decreaseBtn = document.getElementById("decreaseQty");

  let quantity = 1;

  function animateQuantityChange(direction) {
    qtyDisplay.style.animation = "none"; // reset animation
    void qtyDisplay.offsetWidth; // trigger reflow

    if (direction === "increase") {
      qtyDisplay.style.animation = "numberIncrease 0.3s ease";
    } else {
      qtyDisplay.style.animation = "numberDecrease 0.3s ease";
    }
  }

  increaseBtn.addEventListener("click", () => {
    quantity++;
    animateQuantityChange("increase");
    qtyDisplay.textContent = quantity;
  });

  decreaseBtn.addEventListener("click", () => {
    if (quantity > 1) {
      quantity--;
      animateQuantityChange("decrease");
      qtyDisplay.textContent = quantity;
    }
  });
});



/* Image Zoom Microinteraction */
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".image-zoom-container");
  const img = container.querySelector(".zoom-image");
  const lens = container.querySelector(".zoom-lens");
  const zoomLevel = 2.5; // zoom intensity
  const offset = 30; // distance from cursor to lens

  // 👉 Open product page on click
  img.addEventListener("click", () => {
    window.open("https://francescas.com/product/QCH30875B/birth-flower-and-birthstone-charm-set", "_blank");
  });


  img.addEventListener("mouseenter", () => {
    lens.style.display = "block";
    lens.style.opacity = "1";
    lens.style.backgroundImage = `url(${img.src})`;
  });

  img.addEventListener("mouseleave", () => {
    lens.style.opacity = "0";
    setTimeout(() => (lens.style.display = "none"), 200);
  });

  img.addEventListener("mousemove", moveLens);

  function moveLens(e) {
    const rect = img.getBoundingClientRect();
    const lensSize = lens.offsetWidth;
    const lensHalf = lensSize / 2;

    // Mouse coordinates relative to image
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Keep the background in sync with the cursor
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    lens.style.backgroundSize = `${rect.width * zoomLevel}px ${rect.height * zoomLevel}px`;
    lens.style.backgroundPosition = `${bgX}% ${bgY}%`;

    // Offset the lens slightly to the right and below the cursor
    let lensLeft = e.clientX - rect.left + offset;
    let lensTop = e.clientY - rect.top + offset;

    // Prevent the lens from going outside the image container
    if (lensLeft + lensSize > rect.width) lensLeft = rect.width - lensSize;
    if (lensTop + lensSize > rect.height) lensTop = rect.height - lensSize;

    lens.style.left = `${lensLeft}px`;
    lens.style.top = `${lensTop}px`;
  }
});

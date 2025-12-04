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
      qtyDisplay.style.animation = "numberIncrease 0.6s ease";
    } else {
      qtyDisplay.style.animation = "numberDecrease 0.6s ease";
    }
  }

  increaseBtn.addEventListener("click", () => {
    if (quantity < 100) {
      quantity++;
      animateQuantityChange("increase");
      qtyDisplay.textContent = quantity;
    }
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
    lens.style.backgroundImage = `url(${img.src})`;
    lens.style.backgroundSize = `${img.width * zoomLevel}px ${img.height * zoomLevel}px`;
    requestAnimationFrame(() => {
      lens.style.visibility = "visible";
      lens.style.opacity = "1";
    });
  });

  img.addEventListener("mouseleave", () => {
    lens.style.opacity = "0";
    lens.style.visibility = "hidden";
    setTimeout(() => {
      lens.style.display = "none";
    }, 300);
  });

  img.addEventListener("mousemove", (e) => {
    const rect = img.getBoundingClientRect();
    const lensHalf = lens.offsetWidth / 2;

    // Mouse position relative to image
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;

    // Clamp position so lens stays within image bounds
    x = Math.max(lensHalf, Math.min(x, rect.width - lensHalf));
    y = Math.max(lensHalf, Math.min(y, rect.height - lensHalf));

    // Move lens (centered on cursor)
    lens.style.left = `${x - lensHalf}px`;
    lens.style.top = `${y - lensHalf}px`;

    // Move background to match zoom position
    const bgX = ((x / rect.width) * 100).toFixed(2);
    const bgY = ((y / rect.height) * 100).toFixed(2);
    lens.style.backgroundPosition = `${bgX}% ${bgY}%`;
  });
});


// FINAL BUILD CHANGES


// --- Modal Open/Close ---
const quickviewOverlay = document.getElementById("quickviewOverlay");
const closeQuickview = document.getElementById("closeQuickview");

// For demo: open modal automatically
window.addEventListener("load", () => {
  quickviewOverlay.classList.add("active");
});

closeQuickview.addEventListener("click", () => {
  quickviewOverlay.classList.remove("active");
});

// Close when clicking outside modal
quickviewOverlay.addEventListener("click", (e) => {
  if (e.target === quickviewOverlay) {
    quickviewOverlay.classList.remove("active");
  }
});

// ---------------------------
// COLOR SELECTION BEHAVIOR
// ---------------------------

const productImage = document.getElementById("productImage");
const productImageFade = document.getElementById("productImageFade");
const colorCircles = document.querySelectorAll(".color-circle");

let selectedColorImage = null; // stores the currently selected image



// DEFAULT SELECT FIRST COLOR ON PAGE LOAD
window.addEventListener("DOMContentLoaded", () => {
    const firstColor = colorCircles[0];
    selectedColorImage = firstColor.getAttribute("data-image");

    // Set initial product image
    productImage.src = selectedColorImage;

    // Mark first circle as selected (scale + border)
    firstColor.classList.add("selected");
});



// ⭐ ADD HOVER + CLICK BEHAVIOR
colorCircles.forEach(circle => {

    // CLICK → Set this circle as the selected one
    circle.addEventListener("click", () => {
        const newImage = circle.getAttribute("data-image");
        selectedColorImage = newImage;   // update active image

        fadeToImage(selectedColorImage);

        // Remove selected style from all circles
        colorCircles.forEach(c => c.classList.remove("selected"));

        // Add selected style to clicked circle
        circle.classList.add("selected");
    });
});



// ---------------------------
// SMOOTH FADE IMAGE FUNCTION
// ---------------------------
function fadeToImage(newSrc) {
    productImageFade.src = newSrc;
    productImageFade.classList.add("active");

    setTimeout(() => {
        productImage.src = newSrc;
        productImageFade.classList.remove("active");
    }, 600); // matches your fade duration
}


document.getElementById("closeQuickview").addEventListener("click", () => {
  window.open("https://francescas.com/category/jewelry/charm-bar", "_blank");
});

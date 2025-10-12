document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("addToCartBtn");
  
    button.addEventListener("click", () => {
      button.disabled = true;
      button.classList.add("loading");
      button.innerHTML = '<span class="loader"></span> Adding...';
  
      setTimeout(() => {
        button.classList.remove("loading");
        button.classList.add("added");
        button.innerHTML = '<span class="checkmark"></span> Added!';
  
        setTimeout(() => {
          button.classList.remove("added");
          button.innerHTML = 'Add to Cart';
          button.disabled = false;
        }, 2500);
      }, 1500);
    });
  });
  
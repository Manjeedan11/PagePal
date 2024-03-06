//  search

const searchButton = document.getElementById("search-button"),
  searchClose = document.getElementById("search-close"),
  searchContent = document.getElementById("search-content");

if (searchButton) {
  searchButton.addEventListener("click", () => {
    searchContent.classList.add("show-search");
  });
}

if (searchClose) {
  searchClose.addEventListener("click", () => {
    searchContent.classList.remove("show-search");
  });
}

// login

const loginButton = document.getElementById("login-button"),
  loginClose = document.getElementById("login-close"),
  loginContent = document.getElementById("login-content");

if (loginButton) {
  loginButton.addEventListener("click", () => {
    loginContent.classList.add("show-login");
  });
}

if (loginClose) {
  loginClose.addEventListener("click", () => {
    loginContent.classList.remove("show-login");
  });
}

const btn = document.querySelector(".login__button");
const post = document.querySelector(".login__form");
const msg = document.querySelector(".text");

      btn.onclick = () => {
        post.style.display = "none";
      };

// swiper

let swiperHome = new Swiper(".home__swiper", {
  loop: true,
  spaceBetween: -24,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  breakpoints: {
    1220: {
      spaceBetween: -32,
    },
  },
});

const shadowHeader = () => {
  const header = document.getElementById("header");

  this.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.add("shadow-header");
};
window.addEventListener("scroll", shadowHeader);

let swiperFeatured = new Swiper(".featured__swiper", {
  loop: true,
  spaceBetween: 16,
  grabCursor: true,
  slidesPerView: "auto",
  centeredSlides: "auto",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1150: {
      slidesPerView: 4,
      centeredSlides: false,
    },
  },
});

let swiperNew = new Swiper(".new__swiper", {
  loop: true,
  spaceBetween: 16,
  slidesPerView: "auto",

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    1150: {
      slidesPerView: 3,
    },
  },
});

const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");

  this.scrollY >= 560
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

const sr = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(`.home__data, .featured__container, .new__container, .footer`);

sr.reveal(`.home__images`, { delay: 600 });
sr.reveal(`.services__card`, { interval: 100 });
sr.reveal(`.discount__data`, { origin: "left" });
sr.reveal(`.discounted__images`, { origin: "right" });


function openMsgBox() {
  document.querySelector(".msg-btn5").style.opacity = "0";

  document.querySelector(".containerQ").style.clipPath = "circle(75%)";
}

function closeChat() {
  document.querySelector(".containerQ").style.clipPath =
    "circle(0% at 90% 95%)";

  document.querySelector(".msg-btn5").style.opacity = "1";
}

//------Search feature------

// Sample book data
const books = [
  { title: "All The King's Men", author: "Robert Penn Warren", image: "Books_Cover/All_the_king's_man.jpg", discount: "$8.49", price: "$9.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=All_the_King's_men-pages-deleted.pdf"  },
  { title: "Dragons of Eden", author: "Carl Sagan", image: "Books_Cover/Dragons_of_Eden.jpg", discount: "$10.19", price: "$11.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Dragons_of_Eden-pages-deleted.pdf"  },
  { title: "Huckleberry Finn", author: "Mark Twain", image: "Books_Cover/Huckleberry_Finn.jpg", discount: "$5.94", price: "$6.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=The_Adventures_of_Huckleberry Finn-pages-deleted.pdf"  },
  { title: "Metamorphosis", author: "Franz Kafka", image: "Books_Cover/metamorphosis.jpg", discount: "$7.64", price: "$8.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Metamorphosis-pages-deleted.pdf"  },
  { title: "Money For Nothing", author: "Susan Hill", image: "Books_Cover/money_for_nothing.jpg", discount: "$9.34", price: "$10.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Money_for_Nothing-pages-deleted.pdf"  },
  { title: "Crime and Punish", author: "Eyodor Dosloyevsky", image: "Books_Cover/C&P_cover.jpg", discount: "$6.79", price: "$7.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Crime_and_Punishment-pages-deleted.pdf"  },
  { title: "Oliver Twist", author: "Charles Dickens", image: "Books_Cover/Oliver_Twist.jpg", discount: "$5.09", price: "$5.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Oliver_Twist-pages-deleted.pdf"  },
  { title: "The Prince", author: "Machiavelli", image: "Books_Cover/the_prince.jpg", discount: "$6.79", price: "$7.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=The_Prince-pages-deleted.pdf"  },
  { title: "The Testament", author: "John Grisham", image: "Books_Cover/The_testament.jpg", discount: "$8.49", price: "$9.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=The_Testament-pages-deleted.pdf"  },
  { title: "Wizard of Oz", author: "L. Frank Baum", image: "Books_Cover/wizard_of_Oz.jpg", discount: "$5.94", price: "$6.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=The_wizard_of_OZ-pages-deleted.pdf"  },
  { title: "Purity In Death", author: "J.D. Robb", image: "Books_Cover/purity_in_death.jpg", discount: "$7.64", price: "$8.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Purity_in_Death-pages-deleted.pdf"  },
  { title: "The Bible", author: "St. Jerome", image: "Books_Cover/bible.jpg", discount: "$12.74", price: "$14.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Bible.pdf"  },
  { title: "Secret Backers", author: "Sidney Warburg", image: "Books_Cover/Hitler's_secret_backers.jpg", discount: "$8.49", price: "$9.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Secret_backers-pages-deleted.pdf"  },
  { title: "Lonesome Dove", author: "Larry McMurtry", image: "Books_Cover/Lonesome_dove.jpg", discount: "$8.49", price: "$9.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Lonesome_Dove-pages-deleted.pdf"  },
  { title: "Lord Of Rings", author: "J.R.R Tolkien", image: "Books_Cover/Lord_Of_Rings.jpg", discount: "$12.74", price: "$14.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Lord_of_Rings-pages-deleted.pdf"  },
  { title: "Black Beauty", author: "Anna Sewell", image: "Books_Cover/Black_Beauty.jpg", discount: "$6.79", price: "$7.99", pdfLink: "Sample_PdfViewer/sample_view.html?pdf=Black_Beauty-pages-deleted.pdf" },
  // Add more books as needed
];

function displayResults(results) {
  const swiperWrapper = document.querySelector(".featured__swiper");
  
  // Clear previous results
  swiperWrapper.innerHTML = "";

  if (results.length === 0) {
    const noResultsMsg = document.createElement("p");
    noResultsMsg.textContent = "No results found";
    swiperWrapper.appendChild(noResultsMsg);
    return;
  }

  results.forEach(book => {
    const article = document.createElement("article");
    article.classList.add("featured__card");

    const img = document.createElement("img");
    img.src = book.image;
    img.alt = "image";
    img.classList.add("featured__img");
    article.appendChild(img);

    const title = document.createElement("h2");
    title.classList.add("featured__title");
    title.textContent = book.title;
    article.appendChild(title);

    // Create featured__prices
    const prices = document.createElement("div");
    prices.classList.add("featured__prices");
    article.appendChild(prices);

    const discount = document.createElement("span");
    discount.classList.add("featured__discount");
    discount.textContent = book.discount; // Use book discount value
    prices.appendChild(discount);

    const price = document.createElement("span");
    price.classList.add("featured__price");
    price.textContent = book.price; // Use book price value
    prices.appendChild(price);

    // Create Buy now button
    const buyButton = document.createElement("button");
    buyButton.classList.add("button", "buy-button"); // Add "buy-button" class
    buyButton.textContent = "Buy now";
    buyButton.onclick = redirect; // Assuming redirect() is a valid function
    article.appendChild(buyButton); // Append the button to the article

    // Create featured__actions
    const actions = document.createElement("div");
    actions.classList.add("featured__actions");
    article.appendChild(actions);

    // Create eye-line button
    const eyeButton = document.createElement("button");
    const eyeLink = document.createElement("a");
    // Use the stored PDF link from the book data
    eyeLink.href = book.pdfLink;
    eyeLink.innerHTML = `<i class="ri-eye-line" style="color: green;"></i>`;
    eyeButton.appendChild(eyeLink);
    actions.appendChild(eyeButton);
    
    swiperWrapper.appendChild(article);
  });
}

// Function to perform search
function searchBooks() {
  const query = document.getElementById("searchInput").value;
  const results = books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase()) ||
    book.author.toLowerCase().includes(query.toLowerCase())
  );
  displayResults(results);
}

// Event listener for search button click
document.getElementById("searchButton").addEventListener("click", function(event) {
  searchBooks();
});

// Event listener for input changes
document.getElementById("searchInput").addEventListener("keydown", function(event) {
  if (event.key === "Enter") { // Trigger search on Enter key press
    searchBooks();
  }
});

/*Payment Portal*/

function Pay_All_Kings_Man() {
  fetch('http://localhost:8086/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_Dragons_Of_Eden() {
  fetch('http://localhost:8087/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}
function Pay_Huckleberry_Finn() {
  fetch('http://localhost:8088/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}


function Pay_Metamorphosis() {
  fetch('http://localhost:8089/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_Money_For_Nothing() {
  fetch('http://localhost:8090/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}


function Pay_Crime() {
  fetch('http://localhost:8091/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}


function Pay_Oliver_Twist() {
  fetch('http://localhost:8092/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_Prince() {
  fetch('http://localhost:8093/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_testament() {
  fetch('http://localhost:8094/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_wizard_of_OZ() {
  fetch('http://localhost:8095/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_purity_in_death() {
  fetch('http://localhost:8096/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_bible() {
  fetch('http://localhost:8097/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_secret_backers() {
  fetch('http://localhost:8098/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_Lonesome_dove() {
  fetch('http://localhost:8099/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_Lord_Of_Rings() {
  fetch('http://localhost:8100/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

function Pay_Black_Beauty() {
  fetch('http://localhost:8101/create-checkout-session', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) 
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
      window.location.href = data.redirect_url;
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}


function redirect() {
  Pay_All_Kings_Man(); 
}

function redirect1() {
  Pay_Dragons_Of_Eden();
}

function redirect2() {
  Pay_Huckleberry_Finn();
}

function redirect3() {
  Pay_Metamorphosis();
}

function redirect4() {
 Pay_Money_For_Nothing();
}

function redirect5() {
  Pay_Crime();
}

function redirect6() {
  Pay_Oliver_Twist();
}

function redirect7() {
  Pay_Prince();
}

function redirect8() {
  Pay_testament();
}

function redirect9() {
  Pay_wizard_of_OZ();
}

function redirect10() {
  Pay_purity_in_death();
}

function redirect11() {
  Pay_bible();
}

function redirect12() {
  Pay_secret_backers();
}

function redirect13() {
  Pay_Lonesome_dove();
}

function redirect14() {
  Pay_Lord_Of_Rings();
}

function redirect15() {
  Pay_Black_Beauty();
}





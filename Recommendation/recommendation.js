document.addEventListener("DOMContentLoaded", function () {
    const collectionContainer = document.querySelector("#collection .swiper-wrapper");
    const featuredBooksContainer = document.querySelector("#featuredBooks .swiper-wrapper");

    // To create swiper slides for collections
    function createCollectionSlide(book) {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        slide.innerHTML = `
            <article class="featured__card">
                <img src="${book.image}" alt="image" class="featured__img" />
                <h2 class="featured__title">${book.title}</h2>
                <h3 class="featured__author">${book.author}</h3>
                <a href="PdfViewer/view.html"><button class="button">Read</button></a>
            </article>
        `;

        collectionContainer.appendChild(slide);
    }

    // To create swiper slides for featured books
    function createFeaturedBookSlide(book) {
        const slide = document.createElement("div");
        slide.classList.add("swiper-slide");

        slide.innerHTML = `
            <article class="featured__card">
                <img src="${book.image}" alt="image" class="featured__img" />
                <h2 class="featured__title">${book.title}</h2>
                <h3 class="featured__author">by ${book.author}</h3>
                <div class="featured__actions">
                </div>
            </article>
        `;

        featuredBooksContainer.appendChild(slide);
    }

    function scrollToFeatured() {
        var featuredSection = document.getElementById('featured');
        if (featuredSection) {
            // Scroll to the top of the featured section smoothly
            window.scrollTo({
                top: featuredSection.offsetTop,
                behavior: 'smooth'
            });
        }
    }

    // Function to fetch book recommendations based on the entered book name
    function fetchRecommendations(bookName) {
        fetch('http://127.0.0.1:8080/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ bookName: bookName })
        })
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Clear previous output
            // collectionContainer.innerHTML = ''; // Remove this line
            // featuredBooksContainer.innerHTML = ''; // Remove this line

            //Display recommended books for collections and featured books separately
            data.books_by_author.forEach(book => {
                //Assuming there's a field 'collection' in the book object indicating if it's a collection book
                if (book.collection === true) {
                    createCollectionSlide({ image: book['Image-URL-S'], title: book['Book-Title'], author: book['Book-Author'] });
                } else {
                    createFeaturedBookSlide({ image: book['Image-URL-S'], title: book['Book-Title'],  author: book['Book-Author'] });
                }
            });

            //Initializing Swiper for collections
            const collectionSwiper = new Swiper("#collection .featured__swiper", {
                slidesPerView: "auto",
                spaceBetween: 20,
                navigation: {
                    nextEl: "#collection .swiper-button-next",
                    prevEl: "#collection .swiper-button-prev",
                },
            });

            //Initializing Swiper for featured books
            const featuredBooksSwiper = new Swiper("#featuredBooks .featured__swiper", {
                slidesPerView: "auto",
                spaceBetween: 20,
                navigation: {
                    nextEl: "#featuredBooks .swiper-button-next",
                    prevEl: "#featuredBooks .swiper-button-prev",
                },
            });
        })
        .catch(error => {
            console.error('Error:', error);
            collectionContainer.innerHTML = 'Error occurred. Please try again later.';
            featuredBooksContainer.innerHTML = 'Error occurred. Please try again later.';
        });
    }

    document.getElementById('bookForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission
        var bookTitle = document.getElementById('book_title').value; 
        fetchRecommendations(bookTitle);
    });

    

});


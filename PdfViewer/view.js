
const zoomButton = document.getElementById('zoom');
const openFile = document.getElementById('openPDF');
const currentPage = document.getElementById('current_page');
const viewer = document.querySelector('.pdf-viewer');
let currentPDF = {}

function resetCurrentPDF() {
    currentPDF = {
        file: null,
        countOfPages: 0,
        currentPage: 1,
        zoom: 1.5
    }
}

function loadPDF(data) {
    const pdfFile = pdfjsLib.getDocument(data);
    resetCurrentPDF();
    pdfFile.promise.then((doc) => {
        currentPDF.file = doc;
        currentPDF.countOfPages = doc.numPages;
        viewer.classList.remove('hidden');
        document.querySelector('main h3').classList.add("hidden");
        renderCurrentPage();
    }).catch(error => {
        console.error('Error loading PDF:', error);
    });
}

zoomButton.addEventListener('input', () => {
    if (currentPDF.file) {
        document.getElementById('zoomValue').innerHTML = zoomButton.value + "%";
        currentPDF.zoom = parseInt(zoomButton.value) / 100;
        renderCurrentPage();
    }
});

document.getElementById('next').addEventListener('click', () => {
    const isValidPage = currentPDF.currentPage < currentPDF.countOfPages;
    if (isValidPage) {
        currentPDF.currentPage += 1;
        renderCurrentPage();
    }
});

document.getElementById('previous').addEventListener('click', () => {
    const isValidPage = currentPDF.currentPage - 1 > 0;
    if (isValidPage) {
        currentPDF.currentPage -= 1;
        renderCurrentPage();
    }
});

function renderCurrentPage() {
    currentPDF.file.getPage(currentPDF.currentPage).then((page) => {
        var context = viewer.getContext('2d');
        var viewport = page.getViewport({ scale: currentPDF.zoom, });
        viewer.height = viewport.height;
        viewer.width = viewport.width;

        var renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        page.render(renderContext);
    });
    currentPage.innerHTML = currentPDF.currentPage + ' of ' + currentPDF.countOfPages;
}

function getDefinition() {

    var word = document.getElementById('wordInput').value;

    
    var apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;

    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            
            displayDefinition(data);
        })
        .catch(error => {
            
            displayError("Error fetching definition. Please try again.");
        });
}

function displayDefinition(data) {
    var resultDiv = document.getElementById('result');

    
    resultDiv.innerHTML = "";

    
    if (data.length === 0) {
        displayError("Definition not found.");
        return;
    }

    
    data.forEach(entry => {
        resultDiv.innerHTML += `<p><b>${entry.word}</b>: ${entry.meanings[0].definitions[0].definition}</p>`;
    });
}

function displayError(message) {
    var resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `<p style="color: red;">${message}</p>`;
}

/*// Default PDF file path
const defaultPDFPath = 'sample.pdf';
// Simulate file input change event
window.addEventListener('DOMContentLoaded', () => {
    loadPDF(defaultPDFPath);
});*/

// Function to extract query parameters from URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the PDF file path from the query parameter
const pdfPath = getQueryParam('pdf');

// Load the PDF file into the PDF viewer
if (pdfPath) {
    loadPDF(pdfPath);
}

//---------------Download feature----------------------


// Find all elements with the class 'featured__card'
/*var featuredCards = document.querySelectorAll('.featured__card swiper-slide');

// Loop through each featured card
featuredCards.forEach(function(card) {
    // Find the download button within the current card
    var downloadButton = card.querySelector('.ri-download-2-line');

    // Add an event listener to the download button
    downloadButton.addEventListener('click', function() {
        // Get the PDF path from the href attribute of the PDF link within the current card
        var pdfPath = card.querySelector('a').href;

        // Trigger the download function with the PDF path
        downloadPDF(pdfPath);
    });
});

function downloadPDF(pdfPath) {
    // Create an anchor element
    var link = document.createElement('a');
    link.href = pdfPath;
    link.target = '_blank'; // Open in new tab
    link.download = 'document.pdf'; // File name for the downloaded file

    // Append the anchor element to the body
    document.body.appendChild(link);

    // Trigger a click event on the anchor element
    link.click();

    // Remove the anchor element from the body after a short delay
    setTimeout(function() {
        document.body.removeChild(link);
    }, 100);
}*/



 /*// Select the download button
 const downloadButton = document.querySelector('.featured__actions button');

 // Define the download function
 function downloadPDF() {
    // The URL of the PDF file you want to download
    const pdfUrl = "PdfViewer/view.html?pdf=All_the_King's_men.pdf";

    // Trigger the download by navigating to the PDF URL
    window.location.href = pdfUrl;
 }

 // Attach the click event listener to the download button
 downloadButton.addEventListener('click', downloadPDF);*/





//Timer
document.addEventListener('DOMContentLoaded', function() {
    // Start the timer when the page loads
    startTimer();

    // Add event listener to the "Get Quota" button
    document.getElementById('openFormButton').addEventListener('click', function() {
        // Stop the timer and record the time when the button is clicked
        stopTimerAndRecordTime();
    });
});

let startTime; // Variable to store the start time of the timer
let timerInterval; // Variable to store the interval ID

// Function to start the timer
function startTimer() {
    startTime = Date.now(); // Record the start time
    // Update the timer every second
    timerInterval = setInterval(updateTimer, 1000);
}

// Function to stop the timer and record the time
function stopTimerAndRecordTime() {
    clearInterval(timerInterval); // Stop the interval
    // Record the start time in localStorage
    localStorage.setItem('startTime', startTime);
}

// Function to update the timer
function updateTimer() {
    let currentTime = Date.now();
    let elapsedTime = Math.floor((currentTime - startTime) / 1000);
    let minutes = Math.floor(elapsedTime / 60);
    let seconds = elapsedTime % 60;
    let formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
    document.getElementById('timer').textContent = `${formattedTime}`;
}

// Function to pad zero to single digit numbers
function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}

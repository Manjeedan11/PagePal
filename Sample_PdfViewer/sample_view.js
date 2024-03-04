
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

    //Creating the API URL
    var apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;

    //Making the API request
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display the definition
            displayDefinition(data);
        })
        .catch(error => {
            //Handling exceptional errors
            displayError("Error fetching definition. Please try again.");
        });
}

function displayDefinition(data) {
    var resultDiv = document.getElementById('result');

    //Clearing previous results
    resultDiv.innerHTML = "";

    //Checking if the data is empty
    if (data.length === 0) {
        displayError("Definition not found.");
        return;
    }

    //Displaying each definition
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

document.getElementById('downloadButton').addEventListener('click', function() {
    // Replace 'path_to_pdf.pdf' with the actual path to your PDF file
    var pdfPath = 'PdfViewer/view.html?pdf=Lord_of_Rings.pdf'; // Example PDF path
    downloadPDF(pdfPath);
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

    // Remove the anchor element from the body
    document.body.removeChild(link);
}



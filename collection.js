document.getElementById('button read-button').addEventListener('click', function() {
    // Start the timer
    localStorage.setItem('startTime', Date.now());
});

function DownloadFile(fileName) {
var url = "PdfViewer/" + fileName;

var req = new XMLHttpRequest();
req.open("GET", url, true);
req.responseType = "blob";
req.onload = function () {

var blob = new Blob([req.response], { type: "application/octetstream" });

var isIE = false || !!document.documentMode;
if (isIE) {
  window.navigator.msSaveBlob(blob, fileName);
} else {
  var url = window.URL || window.webkitURL;
  link = url.createObjectURL(blob);
  var a = document.createElement("a");
  a.setAttribute("download", fileName);
  a.setAttribute("href", link);
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
};
req.send();
};

document.querySelector('.overlay').addEventListener('click', function() {
  document.querySelector('.featured__swiper').classList.toggle('blur');
});
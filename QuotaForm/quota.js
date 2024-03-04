document.addEventListener("DOMContentLoaded", function() {
  const educationRange = document.getElementById('education-range');
  const educationOutput = document.getElementById('education-level');

  const educationMap = [
      { label: "None", position: 0 },
      { label: "High School", position: 1 },
      { label: "Bachelor's Degree", position: 2 },
      { label: "Master's/Doctoral Degree", position: 3 }
  ];
  
  educationRange.addEventListener('input', function() {
      const level = parseInt(educationRange.value);
      educationOutput.textContent = "Education Level: " + educationMap[level].label;
  });
  
  educationRange.addEventListener('mousemove', function(event) {
      const rect = educationRange.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // This part updates the position of nameOutput relative to the mouse position, but nameOutput is not defined in the provided code.
  });

  const form = document.querySelector('form');
  
  form.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const age = document.querySelector('#age-input').value;
      const education = document.querySelector('#education-range').value;
      const readingSpeed = document.querySelector('#reading-speed-input').value;
      const vocabulary = document.querySelector('#vocabulary-input').value;
      const attentionSpan = document.querySelector('#attention-span-input').value;
      const languageProficiency = document.querySelector('#language-proficiency-input').value;
      const booksRead = document.querySelector('#books-read-input').value;
      
      const data = {
          input: [parseInt(age), parseInt(education), parseInt(readingSpeed), parseInt(vocabulary), parseInt(attentionSpan), parseInt(languageProficiency), parseInt(booksRead)]
      };
  
      fetch('http://127.0.0.1:8083/predict', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(data => {
          const predictionOutput = document.getElementById('prediction-output');
          predictionOutput.textContent = `Predicted Quota: ${data.prediction} mins`;
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the recorded time from localStorage
    let recordedTime = localStorage.getItem('startTime');

    // Display the recorded time
    if (recordedTime) {
        let elapsedTime = Math.floor((Date.now() - recordedTime) / 1000);
        let minutes = Math.floor(elapsedTime / 60);
        let seconds = elapsedTime % 60;
        let formattedTime = `${padZero(minutes)}:${padZero(seconds)}`;
        document.getElementById('recorded-time').textContent = `Recorded Time: ${formattedTime}`;
    } else {
        document.getElementById('recorded-time').textContent = 'No recorded time available.';
    }
});

// Function to pad zero to single digit numbers
function padZero(number) {
    return (number < 10 ? '0' : '') + number;
}


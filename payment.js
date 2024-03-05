
/*function Pay1() {
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

function redirect() {
    Pay1(); // Call the Pay1 function when the button is clicked
  }

function Pay2() {
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

function redirect2() {
    Pay2(); // Call the Pay1 function when the button is clicked
  }
*/

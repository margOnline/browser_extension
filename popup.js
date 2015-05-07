// This callback function is called when the content script has been 
// injected and its results returned
function onPageDetailsReceived(pageDetails)  { 
    document.getElementById('title').value = pageDetails.title; 
    document.getElementById('brand').value = pageDetails.brand;
    document.getElementById('price').value = pageDetails.price;
    document.getElementById('url').value = pageDetails.url;
    document.getElementById('category').value = pageDetails.category; 
    document.getElementById('description').innerText = pageDetails.description; 
} 

var statusDisplay = null;

function addProduct() {
    event.preventDefault();
    var postUrl = 'http://mywebsite.com/admin/products';

    // Set up AJAX POST request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', postUrl, true);
    var title = encodeURIComponent(document.getElementById('title').value);
    var url = encodeURIComponent(document.getElementById('url').value);
    var description = encodeURIComponent(document.getElementById('description').value);
    var brand = encodeURIComponent(document.getElementById('brand').value);
    
    var params = 'title=' + title + 
                 '&brand=' + brand +
                 '&price=' + price +
                 '&url=' + url + 
                 '&description=' + description +
                 '&category=' + category;
                 
    
    // Replace any instances of the URLEncoded space char with +
    params = params.replace(/%20/g, '+');

    // Set correct header for form data 
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // Handle request state change events
    xhr.onreadystatechange = function() { 
        // If the request completed
        if (xhr.readyState == 4) {
            statusDisplay.innerHTML = '';
            if (xhr.status == 200) {
                // If successful, close the popup after a short delay
                statusDisplay.innerHTML = 'Saved!';
                window.setTimeout(window.close, 1000);
            } else {
                // If unsuccessful display error
                statusDisplay.innerHTML = 'Error saving: ' + xhr.statusText;
            }
        }
    };

    // Send the request and set status
    xhr.send(params);
    statusDisplay.innerHTML = 'Saving...';
}

// When the popup HTML has loaded
window.addEventListener('load', function(evt) {
    statusDisplay = document.getElementById('status-display');
    // Handle the product form submit event with the addProduct function
    document.getElementById('add-product').addEventListener('submit', addProduct);
    // Get the event page
    chrome.runtime.getBackgroundPage(function(eventPage) {
        // Call the getPageInfo function in the event page, passing in 
        // the onPageDetailsReceived function as the callback which injects 
        // content.js into the current tab's HTML
        eventPage.getPageDetails(onPageDetailsReceived);
    });
});
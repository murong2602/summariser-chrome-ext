
const summariseButton = document.getElementById("button"); 
const resultDiv = document.getElementById("result")
console.log(summariseButton)

// meaning cloud api key 
const apiKey = "YOUR_API_KEY"

summariseButton.addEventListener('click', () =>{ 

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        const activeTab = tabs[0];
        const url = activeTab.url;

        const formdata = new FormData();
        formdata.append("key", apiKey);
        formdata.append("url", url);
        formdata.append("sentences", "5");

        const requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
        };

        const response = fetch("https://api.meaningcloud.com/summarization-1.0", requestOptions)
        .then(response => response.json())  // Parse the JSON response
        .then(data => {
            console.log(data);  // Log the parsed JSON data
            const result = data.summary; // Access the summary from the data
            resultDiv.innerHTML = result;
        })
        .catch(error => console.log('error', error));
        });

    
})
// Basic JavaScript function to submit an image to the Microsoft Cognitive Services API.
// Note: to get this running, you need a valid subscription key. Also, make sure you
// adapt the URL of the service to match the region where you created it (see the TODO comment).
// 
// Microsoft tutorial (we use the REST API directly, not the JavaScript library):
// https://learn.microsoft.com/en-us/azure/cognitive-services/computer-vision/quickstarts-sdk/image-analysis-client-library

function analyzeButtonClick() {
    // Retrieve the user-entered value of the image URL
    let sourceImageUrl = $("#inputImage").val();
    // Retrieve the user-entered value of the subscription key
    let subscriptionKey = $("#subscriptionKey").val();
    // Call the processing function, passing the user entered values
    // as well as a reference to the output text area element
    AnalyzeImage(subscriptionKey, sourceImageUrl, $("#responseTextArea"));
}

function AnalyzeImage(subscriptionKey, sourceImageUrl, responseTextArea) {
    // Request parameters
    let params = {
        // Choose categories to analyze - see the documentation for reference
        "features": "Description,Tags,Read",
        "language": "en",
        "model-version": "latest",
        "api-version": "2022-10-12-preview"
    };
    
    $.ajax({
        // TODO: adapt the URL to the endpoint of your service
        url: "https://xxxx.cognitiveservices.azure.com/computervision/imageanalysis:analyze?" + $.param(params),
        beforeSend: function(xhrObj) {
            // Request the output formatted as JSON
            xhrObj.setRequestHeader("Content-Type", "application/json");
            // Send the subscription key as part of the header
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subscriptionKey);
        },
        // Data is submitted to the server through a POST request
        type: "POST",
        // Request body: the image URL
        data: '{"url": ' + '"' + sourceImageUrl + '"}',
    })
    .done(function(data) {
        // Successful request: formate the result JSON in a human-friendly
        // way and output it to the text area HTML element.
        responseTextArea.val(JSON.stringify(data, null, 2));
        alert("Success");
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
        // Error: print the error message to the text area HTML element.
        responseTextArea.val(JSON.stringify(jqXHR, null, 2));
        alert("Request Failed");
    });
}
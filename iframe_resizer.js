// Selecting the iframe element
var container = document.getElementById("a83b40eg");
var iframe = document.getElementById("r9b3gdrg");

// Adjusting the iframe height onload event
iframe.onload = () => {
    chrome.runtime.onMessage.addListener(
        async (request, sender, sendResponse) => {
            // registering a active client and showing it in the icon
            if (request.action != undefined) {
                if (request.action == "resize") {
                    console.log(request);
                    container.style.width = request.clientWidth;
                    container.style.height = request.clientHeight;
                    console.log(container);
                }
                return false;
            }
        }
    );
};

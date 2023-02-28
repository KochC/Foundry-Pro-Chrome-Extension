// Selecting the iframe element
var iframe = document.getElementById("a83b40eg");

// Adjusting the iframe height onload event
iframe.onload = function () {
    iframe.contentWindow.addEventListener("load", (event) => {
        console.log("page is fully loaded");
    });
    console.log("resize", iframe.contentWindow.document.body.scrollHeight);
    iframe.style.height =
        iframe.contentWindow.document.body.scrollHeight + "px";
};

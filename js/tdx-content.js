console.log("awespe fuclking")

function runReport() {
    const script = document.createElement('script');
    // Load the external script from the extension's directory
    script.src = chrome.runtime.getURL('js/inject.js');  // Inject external script
    document.documentElement.appendChild(script);

    // Remove the script after it's executed to clean up the DOM
    script.onload = function () {
        this.remove();
    };
}

// Listen for messages from the injected script
window.addEventListener("message", (event) => {
    if (event.data.action === "report_recieved") {
        console.log("Received Injected Data:", event.data.data);

        // Optionally, forward the data to the background script
        chrome.runtime.sendMessage({
            action: "sidepanel_send",
            data: event.data.data
        });
    } else if (event.data.action === "run_report") {
        const uuid = event.data.uuid;
        console.log("Received UUID:", uuid);

        // Now run your report logic inside the iframe
        const filterRows = document.querySelectorAll('.filter');
        filterRows.forEach((row, index) => {
            const filterValueElement = document.getElementById(`filter_value_${index}`);
            if (filterValueElement) {
                filterValueElement.value = uuid;
                console.log(`Updated filter_value_${index} with UUID: ${uuid}`);
            } else {
                console.log(`filter_value_${index} not found`);
            }
        });

        // Trigger the report logic here
        runReport();
    }
});

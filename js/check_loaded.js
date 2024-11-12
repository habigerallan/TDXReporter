function waitForElement(selector, callback) {
    const interval = setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
            clearInterval(interval);
            callback();
        }
    }, 100);
}

function handleReportLoad() {
    window.postMessage({
        action: "receive_loaded",
    }, "*");
}

waitForElement(".filter", handleReportLoad);

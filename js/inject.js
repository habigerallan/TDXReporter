console.log("Script Loaded");

function onElementAvailable(selector, callback) {
    const observer = new MutationObserver(mutations => {
        if (document.querySelector(selector)) {
            observer.disconnect();
            callback();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

__doPostBack('btnRunReport', '');

onElementAvailable("#grdReport", () => {
    console.log("Report Finished Running");

    const rows = document.querySelectorAll("#grdReport tbody tr");
    const tableData = [];

    rows.forEach(row => {
        const leftCell = row.querySelector("td[align='left']");
        const rightCell = row.querySelector("td[align='right']");
        if (leftCell && rightCell) {
            tableData.push({
                left: leftCell.textContent.trim(),
                right: rightCell.textContent.trim()
            });
        }
    });

    window.postMessage({
        action: "report_recieved",
        data: tableData
    }, "*");
});
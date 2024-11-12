function waitForElement(selector, callback) {
    const observer = new MutationObserver(() => {
        let element = document.querySelector(selector);
        if (element) {
            observer.disconnect();
            callback();
        }

        element = document.getElementById("upMain")
        if (element.style.display === "none") {
            observer.disconnect();
            callback();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

function handleReportLoad() {
    const table = document.querySelector("#grdReport");

    let tableData;
    if (table){
        const headerRow = table.querySelector(".TDGridHeader");
        const headers = headerRow 
            ? Array.from(headerRow.querySelectorAll("th")).map(th => {
                const headerText = th.children[0].textContent;
                return headerText.trim();
            })
            : [];
    
        const bodyRows = Array.from(table.querySelectorAll("tbody tr:not(.TDGridHeader):not(.TDFooterRow):not(.TDPagerRow)"));
        const bodyData = bodyRows.map(row => ({
            left: row.querySelector("td[align='left']").textContent.trim(),
            right: row.querySelector("td[align='right']").textContent.trim()
        }));
    
        const footerRow = table.querySelector(".TDFooterRow");
        const footerData = footerRow 
            ? {
                left: footerRow.querySelector("td[align='left']").textContent.trim(),
                right: footerRow.querySelector("td[align='right']").textContent.trim()
            }
            : null;
    
        tableData = {
            body: bodyData,
            footer: footerData
        };
    }


    window.postMessage({
        action: "receive_report",
        data: tableData
    }, "*");
}

__doPostBack('btnRunReport', '');
waitForElement("#grdReport", handleReportLoad);

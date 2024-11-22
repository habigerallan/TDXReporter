function createTableFromData(tableData) {
    const table = document.getElementById("report_table");

    const tbody = table.querySelector("tbody");
    tbody.innerHTML = '';

    const footerCell = document.getElementById("total_tickets");

    if (tableData) {
        tableData.body.forEach(rowData => {
            const row = document.createElement("tr");

            const leftCell = document.createElement("td");
            leftCell.textContent = rowData.left;
            row.appendChild(leftCell);

            const rightCell = document.createElement("td");
            rightCell.textContent = rowData.right;
            row.appendChild(rightCell);

            tbody.appendChild(row);
        });

        footerCell.textContent = tableData.footer.right;
    } else {
        footerCell.textContent = 0;
    }

    const report_data = document.querySelector("#report_data");
    report_data.style.display = "block";
}

function displayError() {
    const error_page = document.querySelector("#error_page");
    error_page.style.display = "block";

    const report_main = document.querySelector("#report_main");
    report_main.style.display = "none";

    const report_data = document.querySelector("#report_data");
    report_data.style.display = "none";

    const loading_page = document.querySelector("#loading_page");
    loading_page.style.display = "none";
}

function copyReport() {
    const table = document.getElementById("report_table");
    const rows = Array.from(table.querySelectorAll("tbody tr"));

    let totals = {
        phones: 0, 
        emails: 0, 
        chats: 0, 
        others: 0
    }

    rows.forEach(row => {
        const source = row.children[0].textContent.trim();
        const count = parseInt(row.children[1].textContent.trim(), 10);

        if (source === "Phone") {
            totals.phones += count;
        } else if (source === "Self-service" || source === "Email") {
            totals.emails += count;
        } else if (source === "Chat") {
            totals.chats += count;
        } else {
            totals.others += count;
        }
    });

    const clipboardText = `${totals.phones}\t${totals.emails}\t${totals.chats}\t${totals.others}`;
    navigator.clipboard.writeText(clipboardText);
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "receive_report") {
        const tableData = request.data;
        createTableFromData(tableData);
        const loading_page = document.querySelector("#loading_page");
        loading_page.style.display = "none";
    } else if (request.action === "receive_url") {
        const iframe = document.getElementById('report-page');

        if (request.data != iframe.src) {
            displayError();
        }
    } else if (request.action === "receive_loaded") {
        const loading_page = document.querySelector("#loading_page");
        loading_page.style.display = "none";

        const report_main = document.querySelector("#report_main");
        report_main.style.display = "block";
    }
});


function main() {
    const iframe = document.getElementById('report-page');
    iframe.contentWindow.postMessage({action: "check_url"}, "*");
    iframe.contentWindow.postMessage({action: "check_loaded"}, "*");

    const uuidButton = document.getElementById('uuid-button');
    uuidButton.addEventListener('click', function () {
        const uuidValue = document.getElementById('uuid-input').value;
        iframe.contentWindow.postMessage({ action: "run_report", uuid: uuidValue }, "*");
        const loading_page = document.querySelector("#loading_page");
        loading_page.style.display = "flex";
    });

    const copyButton = document.getElementById('copy-button');
    copyButton.addEventListener('click', copyReport);

    const refreshButton = document.getElementById('refresh-button');
    refreshButton.addEventListener('click', () => {
        window.location.reload();
    });
}

window.onload = main;
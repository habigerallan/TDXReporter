console.log("main started");

document.getElementById('uuid-button').addEventListener('click', function() {
    const uuidValue = document.getElementById('uuid-input').value;
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const activeTab = tabs[0];
        // Send message to the content script of the active tab
        chrome.tabs.sendMessage(activeTab.id, { action: "run_report", uuid: uuidValue });
    });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "sidepanel_send") {
        const tableData = request.data;


        let existingTable = document.querySelector('table');

        let table;

        if (existingTable) {
            existingTable.innerHTML = '';
            table = existingTable
        } else {
            table = document.createElement('table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
        }

        // Create the header of the table
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');

        const thLeft = document.createElement('th');
        thLeft.textContent = 'Type';
        thLeft.style.border = '1px solid black';
        thLeft.style.padding = '8px';
        const thRight = document.createElement('th');
        thRight.textContent = 'Amount';
        thRight.style.border = '1px solid black';
        thRight.style.padding = '8px';

        headerRow.appendChild(thLeft);
        headerRow.appendChild(thRight);
        thead.appendChild(headerRow);
        table.appendChild(thead);

        // Create the body of the table
        const tbody = document.createElement('tbody');

        // Iterate over tableData and create rows
        tableData.forEach(rowData => {
            const row = document.createElement('tr');

            const tdLeft = document.createElement('td');
            tdLeft.textContent = rowData.left;
            tdLeft.style.border = '1px solid black';
            tdLeft.style.padding = '8px';

            const tdRight = document.createElement('td');
            tdRight.textContent = rowData.right;
            tdRight.style.border = '1px solid black';
            tdRight.style.padding = '8px';

            row.appendChild(tdLeft);
            row.appendChild(tdRight);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        document.getElementById("report_details").appendChild(table);
    }
});
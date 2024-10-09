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
        
        let phonesTotal = 0;
            let emailsAndSelfServiceTotal = 0;
            let chatsTotal = 0;
            let otherTotal = 0;

            // Category mappings
            const categoryMap = {
                "Phone": "phonesTotal",
                "Self-service": "emailsAndSelfServiceTotal",
                "Email": "emailsAndSelfServiceTotal",
                "Chat": "chatsTotal",
                "Walk-in": "otherTotal",
                "Auto-generated": "otherTotal"
            };

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

        const thRight = document.createElement('th');
        thRight.textContent = 'Amount';

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

            const tdRight = document.createElement('td');
            tdRight.textContent = rowData.right;

            const category = categoryMap[rowData.left];
                if (category) {
                    if (category === "phonesTotal") {
                        phonesTotal += parseFloat(rowData.right);
                    } else if (category === "emailsAndSelfServiceTotal") {
                        emailsAndSelfServiceTotal += parseFloat(rowData.right);
                    } else if (category === "chatsTotal") {
                        chatsTotal += parseFloat(rowData.right);
                    } else if (category === "otherTotal") {
                        otherTotal += parseFloat(rowData.right);
                    }
                }

            row.appendChild(tdLeft);
            row.appendChild(tdRight);
            tbody.appendChild(row);
        });

        table.appendChild(tbody);
        document.getElementById("report_details").prepend(table);

        let existingButton = document.getElementById('copy');
        let copyButton;
        if (!existingButton) {
            copyButton = document.createElement('button');
            copyButton.id = "copy"
            copyButton.class = "button"
            copyButton.textContent = "Copy to clipboard";
            document.getElementById("report_details").appendChild(copyButton);

            copyButton.addEventListener('click', function() {
                const totals = `${phonesTotal}\t${emailsAndSelfServiceTotal}\t${chatsTotal}\t${otherTotal}`;
                navigator.clipboard.writeText(totals).then(function() {
                    alert('Copied the totals');
                }).catch(function(err) {
                    console.error('Failed to copy totals: ', err);
                });
            });
        } else {
            copyButton = existingButton;
        }

    }
});
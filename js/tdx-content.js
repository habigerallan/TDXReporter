console.log("awespe fuclking")

function runReport() {
  const script = document.createElement('script');
  // Load the external script from the extension's directory
  script.src = chrome.runtime.getURL('js/inject.js');  // Inject external script
  document.documentElement.appendChild(script);

  // Remove the script after it's executed to clean up the DOM
  script.onload = function() {
      this.remove();
  };
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "run_report") {
      const uuid = request.uuid;
      console.log("Received UUID:", uuid);
      
      // Get all elements that have a class of 'filter'
      const filterRows = document.querySelectorAll('.filter');
      
      // Iterate over each filter row
      filterRows.forEach((row, index) => {
          // Construct the ID for the input elements dynamically
          const filterValueElement = document.getElementById(`filter_value_${index}`);
          
          if (filterValueElement) {
              // Set the value of the hidden input to the received UUID
              filterValueElement.value = uuid;
              console.log(`Updated filter_value_${index} with UUID: ${uuid}`);
          } else {
              console.log(`filter_value_${index} not found`);
          }
      });

      // chrome.runtime.sendMessage({ action: "execute_postback" });
      runReport()
  }
});

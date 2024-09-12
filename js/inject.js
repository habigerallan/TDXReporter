console.log("loaded");
// injectBridge.js

// injected.js

(function() {
    // Check if the function you want to call exists in the global scope
    if (typeof __doPostBack === 'function') {
        // Call the function defined in the page's context
        __doPostBack('btnRunReport', '');  // Example of calling __doPostBack
    } else {
        console.error('__doPostBack is not available.');
    }
})();

function inject_script(name) {
    const script = document.createElement('script');

    script.src = chrome.runtime.getURL('js/' + name + '.js');
    document.documentElement.appendChild(script);

    script.onload = function () {
        this.remove();
    };
}

function run_report(uuid) {
    const filterRows = document.querySelectorAll('.filter');
    filterRows.forEach((_, index) => {
        const filterValueElement = document.getElementById(`filter_value_${index}`);
        if (filterValueElement) {
            filterValueElement.value = uuid;
        }
    });
}

window.addEventListener("message", (event) => {
    console.log(event.data.action);

    if (event.data.action === "check_url") {
        inject_script(event.data.action);
    } else if (event.data.action === "receive_url") {
        chrome.runtime.sendMessage({
            action: event.data.action,
            data: event.data.data
        });
    } else if (event.data.action === "run_report") {
        run_report(event.data.uuid);
        inject_script(event.data.action);
    } else if (event.data.action === "receive_report") {
        chrome.runtime.sendMessage({
            action: event.data.action,
            data: event.data.data
        });
    } else if (event.data.action === "check_loaded") {
        inject_script(event.data.action);
    } else if (event.data.action === "receive_loaded") {
        chrome.runtime.sendMessage({
            action: event.data.action,
        });
    }
});

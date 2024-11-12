window.postMessage({
    action: "receive_url",
    data: window.location.href
}, "*");
chrome.runtime.sendMessage({
    'title': document.title,
    'url': window.location.href,
    'description': window.getSelection().toString()
});
var t = document.querySelector('#addCategories')
t.addEventListener('click', function () {
    // alert("inside click")
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var url = tabs[0].url;
        // document.querySelector('ul').append(url)
        // alert(url)
        chrome.storage.sync.set({ "key": url }, function () {
            chrome.extension.getBackgroundPage().console.log("sync", url)

            chrome.storage.sync.get(['key'], function (result) {
                chrome.extension.getBackgroundPage().console.log('Value currently is ' + result.key);
            });
        })


    });
});
var t = document.querySelector('#addCategories')
t.addEventListener('click', function () {
    // alert("inside click")
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var url = tabs[0].url;
        // document.querySelector('ul').append(url)
        // alert(url)
        chrome.storage.sync.set({ "key": url }, function () {
            // chrome.extension.getBackgroundPage().console.log("sync", url);
            
            chrome.storage.sync.get(['key'], function (result) {
                // chrome.extension.getBackgroundPage().console.log('Value currently is ' + result.key);
                document.querySelector('ul').append('Value currently is ' + result.key);

            });
        })

    });
});

// chrome.tabs.query({
//     active: true,
//     lastFocusedWindow: true
// }, function(tabs) {
//     // and use that tab to fill in out title and url
//     var tab = tabs[0];
//     //console.log(tab.url);
//     //alert(tab.url);
//     var tabTest = tab.url
//     // var pTab = $('<p>').text(tabTest)
//     $('#recentlyAdded').append(tabTest)


// });
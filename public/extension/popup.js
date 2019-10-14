// var t = document.querySelector('#addCategories')
// t.addEventListener('click', function () {
//     // alert("inside click")
//     chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//         var url = tabs[0].url;
//         // document.querySelector('ul').append(url)
//         // alert(url)
//         chrome.storage.sync.set({ "key": url }, function () {
//             // chrome.extension.getBackgroundPage().console.log("sync", url);
            
//             chrome.storage.sync.get(['key'], function (result) {
//                 // chrome.extension.getBackgroundPage().console.log('Value currently is ' + result.key);
//                 document.querySelector('ul').append('Value currently is ' + result.key);

//             });
//         })

//     });
// });

$('#testBtn').on('click', function(){

chrome.tabs.query({
    active: true,
    lastFocusedWindow: true
}, function(tabs) {
    // and use that tab to fill in out title and url
    var tab = tabs[0];
    console.log(tab.url);
    //alert(tab.url);
    var tabTest = tab.url
    // var pTab = $('<p>').text(tabTest)
    $('#test').append(tabTest)

    // var div=document.createElement("div"); 
    // document.body.appendChild(div); 
    // div.innerText=tabTest.toString();

    fetch('http://localhost:5000/extension', {
        method: 'POST',
        body: JSON.stringify(  {url: tab.url}  ),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
});

})
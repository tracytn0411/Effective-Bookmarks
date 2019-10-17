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

// });

//     });

chrome.tabs.query({
    active: true,
    currentWindow: true
}, function(tabs) {
    // and use that tab to fill in out title and url
    var tab = tabs[0];
    //alert(tab.url);
    var tabUrl = tab.url
    var tabTitle = tab.title
    console.log(tabUrl)
    console.log(tabTitle)
    // var pTab = $('<p>').text(tabTest)
    //$('#test').append(tabUrl)
    $('#newTitle').append(tabTitle)
    
    // var div=document.createElement("div"); 
    // document.body.appendChild(div); 
    // div.innerText=tabTest.toString();
    
    $('.saveEB').on('click', function(){


    fetch('http://localhost:5000/extension', {
        method: 'POST',
        body: JSON.stringify(  {tab_title: tabTitle, tab_url: tabUrl}  ),
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }
    })
    .then(
        console.log (tabTitle)
    )
});

})
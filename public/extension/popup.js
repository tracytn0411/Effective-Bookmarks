

chrome.tabs.query({
  active: true,
  currentWindow: true
}, function (tabs) {
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

  $('.saveEB').on('click', function () {

    window.close()
    fetch('http://localhost:5000/extension', {
        method: 'POST',
        body: JSON.stringify({
          tab_title: tabTitle,
          tab_url: tabUrl
        }),
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        }
      })
      .then(
        console.log(tabTitle)
      )
  });
  $('.closeEB').on('click', function(){
    window.close();
  })

})
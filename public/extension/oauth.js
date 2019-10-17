window.onload = function() {
    document.querySelector('.logInBtn').addEventListener('click', function() {
      chrome.identity.getAuthToken({interactive: true}, function(token) {
        console.log(token);
        var userToken = token;
        chrome.storage.sync.set({signed_in: userToken}, function(){
          console.log('Value is set to ' + userToken);
          //chrome.extension.getBackgroundPage()
        })
      });
    });
  };


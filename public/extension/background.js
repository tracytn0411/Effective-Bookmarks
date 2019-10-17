// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// 'use strict';

chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.set({
    color: '#3aa757'
  }, function () {
    console.log("The color is green.");
  });
})

//Fired when a browser action icon is clicked. Does not fire if the browser action has a popup.

chrome.browserAction.onClicked.addListener(function() {
  //chrome.browserAction.setPopup({popup: 'index.html'});

  chrome.storage.sync.get('signed_in', function(data) {
    console.log(data)
    if (data.signed_in) {
      chrome.browserAction.setPopup({popup: 'popup.html'});
    } else {
      chrome.browserAction.setPopup({popup: 'popup_sign_in.html'});
    }
  });

});

// chrome.browserAction.onClicked.addListener(function(tab) {
//   // No tabs or host permissions needed!
//   console.log('Turning ' + tab.url + ' red!');
//   chrome.tabs.executeScript({
//     code: 'document.body.style.backgroundColor="red"'
//   });
// });


    // chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    //   chrome.declarativeContent.onPageChanged.addRules([{
    //     conditions: [new chrome.declarativeContent.PageStateMatcher({
    //       pageUrl: {
    //         hostEquals: 'developer.chrome.com'
    //       },
    //     })],
    //     actions: [new chrome.declarativeContent.ShowPageAction()]
    //   }]);
    // })
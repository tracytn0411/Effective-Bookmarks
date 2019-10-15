$(document).ready(function () {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $('#sidebarCollapse').on('click', function () {
    // open or close navbar
    $('#sidebar, #content').toggleClass('active');
    // close dropdowns
    $('.collapse.in').toggleClass('in');
    // and also adjust aria-expanded attributes we use for the open/closed arrows
    // in our CSS
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });

  //toggle recentlyAdded footbar
  $('.recentBtn').on('click', function () {
    $('.newUrls').toggleClass('d-none');
    $(this).find("i").toggleClass("fa-angle-double-down fa-angle-double-up");
  })
});

displayCategories();
displaySubcat();
displayRecent();

function displayCategories() {
  $('.categories').empty();
  $.ajax({
      url: '/displaycat',
      method: 'GET'
    })
    .then(function (categories) {
      for (let catIndex in categories) {
        //console.log(catIndex);

        var catName = $('<a>').text(categories[catIndex].category_name).attr({
          'href': '#' + categories[catIndex].id,
          'data-toggle': 'collapse',
          'aria-expanded': 'false',
          'class': 'dropdown-toggle'
        });
        var catLi = $('<li>')
        var subcatUl = $('<ul>').addClass('collapse list-unstyled subcat').attr('id', categories[catIndex].id);


        $('.categories').append(catLi)
        catLi.append(catName)
        catLi.append(subcatUl)

      }
    })
}

function displaySubcat() {
  $('.subcat').empty()
  $.ajax({
    url: '/displaySubcat',
    method: 'GET'
  })
  .then(function (subcategories) {
    for (let subcatIndex in subcategories) {
      var subcatName = $('<a>').addClass('btn subcatBtn').text(subcategories[subcatIndex].subcat_name).attr({
        'href': '#',
        'role': 'button',
        'data': subcategories[subcatIndex].id
      });

      var subcatLi = $('<li>').append(subcatName);
      $('#' + subcategories[subcatIndex].cat_id).append(subcatLi);

      var bookmarkList = $('<div>').addClass('bookmarks').attr('id', 'urlSubID' + subcategories[subcatIndex].id);
      $('.mainContent').append(bookmarkList);
    }
  })
}

$(document).on('click', '.subcatBtn', function () {
  $('.bookmarks').empty();
  var subcatBtn_id = $(this).attr('data');
  console.log(subcatBtn_id)

  $.ajax({
      url: '/displayURL',
      method: 'POST',
      data: {
        subcat_id: subcatBtn_id
      }
    })
    .then(function (urls) {
      for (let urlIndex in urls) {
        var urlLink = $('<a>').text(urls[urlIndex].bookmark_url).attr({
          'href': urls[urlIndex].bookmark_url,
          'target': '_blank'
        })

        $('#' + 'urlSubID' + urls[urlIndex].subcat_id).append(urlLink)
      }
    })
})

//table *categories*
$(document).on('click', '#addCat', function () {
  event.preventDefault();
  var newCat = $('#inputCat').val();
  console.log(newCat);

  $.ajax({
    url: '/insertcat',
    method: 'POST',
    data: {
      category_name: newCat
    }
  })
  .then(function (res) {
    displayCategories()
  })
})

//table *subcategories*
$(document).on('click', '#addSubCat', function () {
  event.preventDefault()

  var newSubcat = $('#inputSubcat').val();
  var parentCatID = $('#selectCat').val(); //Cat ID of the new subcat
  console.log(newSubcat)
  console.log(parentCatID);

  $.ajax({
      url: '/insertSubcat',
      method: 'POST',
      data: {
        cat_id: parentCatID,
        subcat_name: newSubcat
      }
    })
    .then(function (res) {
      displaySubcat()
    })
})

//table *bookmarks*
$(document).on('click', '#addUrl', function () {
  event.preventDefault()

  var newUrl = $('#inputBookmark').val();
  var parentCat = $('#selectCatU').val();
  var parentSubcat = $('#selectSubcatU option:selected').attr('data');
  console.log(parentSubcat)

  $.ajax({
      url: '/insertURL',
      method: 'POST',
      data: {
        cat_id: parentCat,
        subcat_id: parentSubcat,
        bookmark_url: newUrl
      }
    })
    .then(function (res) {
      console.log('yayyyy');
    })
})

//table *recentlyAdded*
function displayRecent() {
  $('#recentAdded').empty();
  $.ajax({
      url: '/extension',
      method: 'GET',
    })
    .then(function (urls) {
      for (let urlIndex in urls) {
        console.log(urls)
        var urlLink = $('<p>').text(urls[urlIndex].url)
        var urlLi = $('<li>').append(urlLink)
        $('#recentAdded').append(urlLi)
      }
    })
}
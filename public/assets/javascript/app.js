$(document).ready(function () {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $('#sidebarCollapse').on('click', function () {
    $('#sidebar, #content').toggleClass('active');
    // close dropdowns
    $('.collapse.in').toggleClass('in');
    // and also adjust aria-expanded attributes we use for the open/closed arrows
    // in our CSS
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
   
    $(this).find("i").toggleClass("fa-angle-double-left fa-angle-double-right");
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

//display bookmarks 
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
    .then(function (bookmarks) {
      
      $.each(bookmarks, function (){
        var cardDiv = $('<div>').addClass('card')
        var cardCollapse = $('<div>').addClass('collapse').attr('id', 'collapse' + this.id)
        var bookmarkUrl = $('<div>').addClass('card-body').append($('<a>').addClass('text-decoration-none').text(this.bookmark_url).attr({
          'href': this.bookmark_url,
          'target': '_blank'
        }))
        var cardHeader = $('<div>').addClass('card-header bookmarkHeader')
        
        var bookmarkName = $('<button>').addClass('btn d-inline').attr({
          'type': 'button',
          'data-toggle':'collapse', 
          'data-target':'#collapse' + this.id,
          'aria-expanded': 'false',
          'aria-controls': 'collapse' + this.id
        }).text(this.bookmark_name);

        var deleteForm = $('<form>').addClass('recentDelete d-inline').attr({
          'action': '/removeRecent?_method=DELETE',
          'method': 'POST',
          'data-id': this.id,
        }).append($('<button>').addClass('btn recentDelBtn').append('<i class="fa fa-times"></i>'))
        
        cardCollapse.append(bookmarkUrl)
        cardDiv.append(cardHeader,cardCollapse);
        cardHeader.append(bookmarkName, deleteForm)
        //$('.recentAdded').append(cardDiv);
        $('#' + 'urlSubID' + this.subcat_id).append(cardDiv)
      });
    });
    // .then(function (urls) {
    //   for (let urlIndex in urls) {
        
    //     var deleteForm = $('<form>').addClass('urlDelete').attr({
    //       'action': '/removeUrl?_method=DELETE',
    //       'method': 'POST',
    //       'data': urls[urlIndex].id
    //     }).append($('<button>').addClass('btn urlDelBtn').append('<i class="fa fa-times"></i>'))

    //     var urlLink = $('<a>').addClass('list-group-item list-group-item-action d-flex justify-content-between align-items-center  bookmarkURL').text(urls[urlIndex].bookmark_url).attr({
    //       'href': urls[urlIndex].bookmark_url,
    //       'target': '_blank'
    //     }).append(deleteForm)


    //     $('#' + 'urlSubID' + urls[urlIndex].subcat_id).append(urlLink)
    //   }
    // })
})

//delete urls
$(document).on('click', '.urlDelete', function(){
  event.preventDefault();
  var urlId = $(this).attr('data')
  console.log(urlId)
  $(this).parent().parent().remove();//remove from DOM

  $.ajax({
    url: '/removeUrl?_method=DELETE',
    method: 'POST',
    data: {
      id : urlId
    }
  }).then(function(res){
    console.log('url deleted!')
  });
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

  var newEbName = $('#inputEbName').val()
  var newEbUrl = $('#inputEbURL').val();
  var parentCat = $('#selectCatU').val();
  var parentSubcat = $('#selectSubcatU option:selected').attr('data');
  console.log(parentSubcat)

  $.ajax({
      url: '/insertURL',
      method: 'POST',
      data: {
        cat_id: parentCat,
        subcat_id: parentSubcat,
        bookmark_name: newEbName,
        bookmark_url: newEbUrl
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
    .then(function (recentEBs) {
      
      $.each(recentEBs, function (){
        var cardDiv = $('<div>').addClass('card')
        var cardCollapse = $('<div>').addClass('collapse').attr('id', 'collapse' + this.id)
        var recentUrl = $('<div>').addClass('card-body').append($('<a>').addClass('text-decoration-none').text(this.current_url).attr({
          'href': this.current_url,
          'target': '_blank'
        }))
        var cardHeader = $('<div>').addClass('card-header recentHeader')
        
        var cardTitle = $('<button>').addClass('btn d-inline').attr({
          'type': 'button',
          'data-toggle':'collapse', 
          'data-target':'#collapse' + this.id,
          'aria-expanded': 'false',
          'aria-controls': 'collapse' + this.id
        }).text(this.current_title);

        var deleteForm = $('<form>').addClass('recentDelete d-inline').attr({
          'action': '/removeRecent?_method=DELETE',
          'method': 'POST',
          'data-id': this.id,
        }).append($('<button>').addClass('btn recentDelBtn').append('<i class="fa fa-times"></i>'))
        
        cardCollapse.append(recentUrl)
        cardDiv.append(cardHeader,cardCollapse);
        cardHeader.append(cardTitle, deleteForm)
        $('.recentAdded').append(cardDiv);
      });
    });
}

//delete recent urls
$(document).on('click', '.recentDelete', function(){
  event.preventDefault();
  var recentId = $(this).attr('data-id')
  console.log(recentId)
  $(this).parent().remove();//remove from DOM

  $.ajax({
    url: '/removeRecent?_method=DELETE',
    method: 'POST',
    data: {
      id : recentId
    }
  }).then(function(res){
    console.log('url deleted!')
  });
})

//Team akt modal
// $('.teamBtn').on('click', function(){
//   event.preventDefault(); 

// })
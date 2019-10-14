$(document).ready(function () {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  // $("#footerbar").mCustomScrollbar({
  //   axis: 'x'
  // });

  $('#sidebarCollapse').on('click', function () {
    // open or close navbar
    $('#sidebar, #content').toggleClass('active');
    // close dropdowns
    $('.collapse.in').toggleClass('in');
    // and also adjust aria-expanded attributes we use for the open/closed arrows
    // in our CSS
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });

  // $('#footbarCollapse').on('click', function () {
  //   $('#footbar, #contentBody').toggleClass('active');
  // });
  $('.recentBtn').on('click', function(){
    $('.newUrls').toggleClass('d-none')
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
  .then(function(categories){
    for (let catIndex in categories) {
      console.log(catIndex);

      var catName = $('<a>').text(categories[catIndex].category_name).attr({'href':'#'+categories[catIndex].id, 'data-toggle':'collapse', 'aria-expanded':'false', 'class':'dropdown-toggle'});
      var catLi = $('<li>')
            
      var subcatUl = $('<ul>').addClass('collapse list-unstyled subcat').attr('id',categories[catIndex].id);

      //var subcatName = $('<a>').text('all URLs').attr('href','#');
      var subcatForm = $('<form>').attr({'id':'inputSubcat', 'action':'/insertSubcat', 'method':'POST'})
      var subcatSection = $('<section>').addClass('input-group')
      var subcatInput = $('<input>').addClass('form-control').attr({
        'type':'text', 
        'placeholder':'new subcategory...', 
        'aria-label': 'New Subcat',
        'aria-describedby': 'button-addon2',
        'name': 'subcat_name'
      });

      //Button to add subcat
      var subcatDiv = $('<div>').addClass('input-group-append')
      var subCatBtn = $('<button>').addClass('btn btn-info addSubCat').attr({
        'type':'button',
        'id': 'button-addon2',
        'cat_id': categories[catIndex].id, //Need cat_id for db table subcategories
        'cat_name': categories[catIndex].category_name
        
      }).append('<i class = "fa fa-plus"></i>');

      subcatForm.append(subcatSection);
      subcatSection.append(subcatInput);
      subcatSection.append(subcatDiv)
      subcatDiv.append(subCatBtn);

      var subcatLi = $('<li>').append(subcatForm);
      
      $('.categories').append(catLi)
      catLi.append(catName)
      catLi.append(subcatUl)
      subcatUl.append(subcatLi)

    }
  })
}

$('#addCat').on('click', function() {
  event.preventDefault();
  
  var newCat = $('#inputCat').val();
  console.log(newCat);

  $.ajax({
    url: '/insertcat',
    method: 'POST',
    data: {
      category_name: newCat
    }
  }).then(function(res){
    displayCategories()
  })
})

function displaySubcat(){
  //$('.subcat').empty()
  $.ajax({
    url: '/displaySubcat',
    method: 'GET'
  }).
  then(function(subcategories) {
    for (let subcatIndex in subcategories) {
      var subcatName = $('<a>').text(subcategories[subcatIndex].subcat_name).attr('href','#');
      var subcatLi = $('<li>').append(subcatName);

      $('#' + subcategories[subcatIndex].cat_id).append(subcatLi)
    }
  })
}

$(document).on('click', '.addSubCat', function(){
  event.preventDefault()

  var newSubcat = $('#inputSubcat input[name=subcat_name]').val(); 
  var parentCatID = $(this).attr('cat_id'); //Cat ID of the new subcat
  console.log(newSubcat)
  console.log(parentCatID);

  // var subcatName = $('<a>').text(newSubcat).attr('href','#');
  // var subcatLi = $('<li>').append(subcatName);

  // $('.subcat').prepend(subcatLi)

  $.ajax({
    url: '/insertSubcat',
    method: 'POST',
    data: {
      subcat_name: newSubcat,
      cat_id : parentCatID
    }
  })
  .then(function(res){
    displaySubcat()
  })
  // .then(function(subcategories) {
  //   for (let subcatIndex in subcategories) {
  //     var subcatName = $('<a>').text(subcategories[subcatIndex].subcat_name).attr('href','#');
  //     var subcatLi = $('<li>').append(subcatName);

  //     $('#' + subcategories[subcatIndex].cat_id).append(subcatLi)
  //   }
  // })

})

function displayRecent (){
  $('#recentAdded').empty();
  $.ajax({
    url: '/extension',
    method: 'GET',
  })
  .then(function(urls){
    for (let urlIndex in urls) {
      console.log(urls)
      var urlLink = $('<p>').text(urls[urlIndex].url)
      var urlLi = $('<li>').append(urlLink)
      $('#recentAdded').append(urlLi)
    }
  })
}
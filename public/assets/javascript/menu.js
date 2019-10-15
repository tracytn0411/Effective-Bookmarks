// Display modal for Add menu list
var divModal = $('<div>').addClass('modal-dialog').attr('role', 'document');
var modalHeader = $('<div>').addClass('modal-header').append(
  $('<h4>').addClass('modal-title text-info addHeader')
);
var modalBody = $('<div>').addClass('modal-body addModalBody');
var modalContent = $('<div>').addClass('modal-content').append(modalHeader, modalBody)

divModal.append(modalContent);
$('#addModal').append(divModal);

//function for each Add option
function addMenu(menuItem) {
  //var menuOption = $('#addOptions').value;
  $('.addModalBody').empty()
  switch (menuItem) {
    case 'inputCat':
      newCat()
      break;
    case 'inputSubcat':
      newSubcat()
      break;
    case 'inputEB':
      newEB()
      break;
  }
}

//function add new row to table *categories*
function newCat() {
  $('.addHeader').text('Add category');
  var catForm = $('<form>').attr({
    'action': '/insertcat',
    'method': 'POST'
  })
  var catInput = $('<div>').addClass('form-group').append([
    $('<label>').attr('for', 'inputCat').text('Name'),
    $('<input>').addClass('form-control').attr({
      'type': 'text',
      'aria-label': 'New Category',
      'id': 'inputCat'
    })
  ])
  var catBtn = $('<button>').addClass('btn btn-info').attr({
    'id': 'addCat',
    'data-dismiss': 'modal'
  }).text('Save');

  catForm.append(catInput, catBtn);
  modalBody.append(catForm);
  $('#addModal').modal('show');
}

//function add new row to table *subcategories*
function newSubcat() {
  $('.addHeader').text('Add subcategory');
  var subcatForm = $('<form>').attr({
    'action': '/insertSubcat',
    'method': 'POST'
  })
  var parentCat = $('<div>').addClass('form-group').append(
    $('<select>').addClass('custom-select').attr('id', 'selectCat').append(
      $('<option>').text('Pick a category...')
    )
  )
  var subcatInput = $('<div>').addClass('form-group').append([
    $('<label>').attr('for', 'inputCat').text('Name'),
    $('<input>').addClass('form-control').attr({
      'type': 'text',
      'aria-label': 'New Subcat',
      'id': 'inputSubcat'
    })
  ])
  var subcatBtn = $('<button>').addClass('btn btn-info').attr({
    'id': 'addSubCat',
    'data-dismiss': 'modal'
  }).text('Save')

  $.ajax({
      url: '/displaycat',
      method: 'GET'
    })
    .then(function (categories) {
      for (let catIndex in categories) {
        var catOption = $('<option>').attr('value', categories[catIndex].id).text(categories[catIndex].category_name)
        $('#selectCat').append(catOption);
      }
    })

  subcatForm.append(parentCat, subcatInput, subcatBtn)
  modalBody.append(subcatForm)
  $('#addModal').modal('show')
}

//function add new row to table *bookmarks*
function newEB() {
  $('.addHeader').text('Add bookmark');
  var urlForm = $('<form>').attr({
    'action': '/insertBookmark',
    'method': 'POST'
  })
  var parentCat = $('<div>').addClass('form-group').append(
    $('<select>').addClass('custom-select').attr('id', 'selectCatU').append(
      $('<option>').text('Pick a category...')
    )
  )
  var parentSubcat = $('<div>').addClass('form-group').append(
    $('<select>').addClass('custom-select').attr('id', 'selectSubcatU').append(
      $('<option>').text('Pick a subcategory...')
    )
  )

  var urlInput = $('<div>').addClass('form-group').append([
    $('<label>').attr('for', 'inputBookmark').text('URL'),
    $('<input>').addClass('form-control').attr({
      'type': 'text',
      'aria-label': 'New Bookmark',
      'id': 'inputBookmark'
    })
  ])
  var urlBtn = $('<button>').addClass('btn btn-info').attr({
    'id': 'addUrl',
    'data-dismiss': 'modal'
  }).text('Save')


  $.ajax({
      url: '/displaycat',
      method: 'GET'
    })
    .then(function (categories) {
      for (let catIndex in categories) {
        var catOption = $('<option>').attr('value', categories[catIndex].id).text(categories[catIndex].category_name)
        $('#selectCatU').append(catOption);
      }
      $.ajax({
          url: '/displaySubcat',
          method: 'GET',
        })
        .then(function (res) {
          for (let index in res) {
            var subcatOption = $('<option>').attr({
              'value': res[index].cat_id,
              'data': res[index].id,
              'id': 'subData'
            }).text(res[index].subcat_name)
            $('#selectSubcatU').append(subcatOption)
          }
        })

      // Filter subcat options based on selected cat option
      $('#selectCatU').change(function () {
        if ($(this).data('options') === undefined) {
          $(this).data('options', $('#selectSubcatU option').clone());
        }
        var sCatID = $(this).val();
        console.log(sCatID)

        var options = $(this).data('options').filter('[value=' + sCatID + ']');
        console.log(options)
        $('#selectSubcatU').html(options);
      })
    })

  urlForm.append(parentCat, parentSubcat, urlInput, urlBtn)
  modalBody.append(urlForm)
  $('#addModal').modal('show')
}

var ThemeVariantsController = Paloma.controller('Admin/ThemeVariants');

ThemeVariantsController.prototype.edit = function () {
  $('#theme_variant_theme_id').select2({placeholder: 'Select a theme'});
  $('#theme_variant_video_type_id').select2({placeholder: 'Select a video type'});

  var sceneSelectOptions = {
    placeholder: 'Select a scene',
    allowClear: true
  };

  $('.scene-select').select2(sceneSelectOptions);

  $('#scenes').on('cocoon:before-insert', function (e, insertedItem) {
    insertedItem.find('select').select2(sceneSelectOptions);
  });

  var scenesList = $('#scenes');
  var sortable = Sortable.create(scenesList[0], {
    handle: '.handle',
    onSort: function () {
      _.each(scenesList.find('li'), function (item, index) {
        $(item).find('.theme-scene-position').val(index + 1);
      });
    }
  });
};
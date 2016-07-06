var ThemeVariantsController = Paloma.controller('Admin/ThemeVariants');

ThemeVariantsController.prototype.edit = function () {
  $('#theme_variant_theme_id').select2({placeholder: 'Select a theme'});
  $('#theme_variant_video_type_id').select2({placeholder: 'Select a video type'});

  var sceneSelectOptions = {
    placeholder: 'Select a scene',
    allowClear: true
  };

  var transitionSelectOptions = {
    placeholder: 'Select a transition',
    allowClear: true
  };

  $('.scene-select').select2(sceneSelectOptions);
  $('.transition-select').select2(transitionSelectOptions);

  $('#scenes').on('cocoon:before-insert', function (e, insertedItem) {
    insertedItem.find('.scene-select').select2(sceneSelectOptions);
    insertedItem.find('.transition-select').select2(transitionSelectOptions);
  });

  var scenesList = $('#scenes');
  Sortable.create(scenesList[0], {
    handle: '.handle',
    onSort: function () {
      _.each(scenesList.find('li'), function (item, index) {
        $(item).find('.theme-scene-position').val(index + 1);
      });
    }
  });
};

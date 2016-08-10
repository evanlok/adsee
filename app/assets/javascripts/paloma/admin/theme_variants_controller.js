var ThemeVariantsController = Paloma.controller('Admin/ThemeVariants');

ThemeVariantsController.prototype.edit = function () {
  $('#theme_variant_theme_id').select2({placeholder: 'Select a theme'});
  $('#theme_variant_video_type_id').select2({placeholder: 'Select a video type'});

  function sceneSelectOptions() {
    var aspectRatio = $('#theme_variant_aspect_ratio').val();

    return {
      placeholder: 'Select a scene',
      allowClear: true,
      minimumInputLength: 0,
      ajax: {
        url: '/scenes.json?aspect_ratio=' + aspectRatio,
        dataType: 'json',
        delay: 250,
        data: function (params) {
          return {
            name: params.term,
            page: params.page
          };
        },
        processResults: function (data) {
          return {
            results: _.map(data, function (item) {
              return {id: item.id, text: item.name};
            })
          };
        },
        cache: true
      }
    };
  }

  var transitionSelectOptions = {
    placeholder: 'Select a transition',
    allowClear: true
  };

  $('.scene-select').select2(sceneSelectOptions());
  $('.transition-select').select2(transitionSelectOptions);

  $('#scenes').on('cocoon:before-insert', function (e, insertedItem) {
    insertedItem.find('.scene-select').select2(sceneSelectOptions());
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

  $('#theme_variant_aspect_ratio').on('change', function () {
    $('.scene-select').select2(sceneSelectOptions());
  });
};

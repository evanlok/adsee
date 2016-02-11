var ScenesController = Paloma.controller('Admin/Scenes');

ScenesController.prototype.edit = function () {
  $('#scene_tags').select2({
    tags: true,
    tokenSeparators: [','],
    minimumInputLength: 1,
    ajax: {
      url: '/admin/scenes/tags.json',
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term,
          page: params.page
        };
      },
      processResults: function (data) {
        return {
          results: data
        };
      },
      cache: true
    }
  });
};

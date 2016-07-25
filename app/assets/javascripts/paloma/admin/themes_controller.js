var ThemesController = Paloma.controller('Admin/Themes');

ThemesController.prototype.edit = function () {
  $('#theme_song_id').select2({
    placeholder: 'Select a song',
    allowClear: true
  });

  $('#theme_font_id').select2({
    placeholder: 'Select a font',
    allowClear: true
  });
};

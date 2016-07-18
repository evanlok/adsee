class SongsController < ApplicationController
  def index
    @songs = Song.includes(:song_category).order(:name)

    respond_to do |format|
      format.json
    end
  end
end

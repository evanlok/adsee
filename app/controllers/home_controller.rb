class HomeController < ApplicationController
  before_action :authenticate_user!, except: [:index]

  def index
  end

  def scene_editor
    # This action is a catch all for angular routing and injects server side values onto the page
    @songs = Song.includes(:song_category).order(:name)
    @fonts = Font.order(:name)
    @transitions = Transition.order(:name)
  end
end

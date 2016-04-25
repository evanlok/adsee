class ScenesController < ApplicationController
  def index
    @scenes = Scene.includes(:scene_category).order(:name)

    respond_to do |format|
      format.json
    end
  end
end

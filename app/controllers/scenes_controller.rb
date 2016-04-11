class ScenesController < ApplicationController
  def index
    @scenes = Scene.order(:name)

    respond_to do |format|
      format.json
    end
  end
end

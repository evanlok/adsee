class ScenesController < ApplicationController
  def index
    @scenes = Scene.includes(:scene_category).order(:name)

    if params[:aspect_ratio].present?
      @scenes = @scenes.with_aspect_ratio(params[:aspect_ratio])
    end

    if params[:name].present?
      @scenes = @scenes.where('name ilike ?', "%#{params[:name]}%")
    end

    respond_to do |format|
      format.json
    end
  end
end

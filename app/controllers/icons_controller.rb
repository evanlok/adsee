class IconsController < ApplicationController
  def index
    @icons = Icon.all
    @icons = @icons.search(params[:q]) if params[:q].present?

    respond_to do |format|
      format.json
    end
  end
end

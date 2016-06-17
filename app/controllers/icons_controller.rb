class IconsController < ApplicationController
  def index
    @icons = Icon.order(:vendor, :name)
    @icons = @icons.search(params[:q]) if params[:q].present?
    @icons = paginate(@icons, per_page: 200)

    respond_to do |format|
      format.json
    end
  end
end

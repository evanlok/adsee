class FontsController < ApplicationController
  def index
    @fonts = Font.order(:name)

    respond_to do |format|
      format.json
    end
  end
end

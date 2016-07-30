class AdTypesController < ApplicationController
  def index
    @industry = Industry.find(params[:industry_id])
    @ad_types = @industry.ad_types

    respond_to do |format|
      format.html
      format.json
    end
  end
end

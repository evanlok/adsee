class AdTypesController < ApplicationController
  def index
    @ad_types = AdType.page(params[:page]).per(50)

    if params[:industry_id].present?
      industry = Industry.find(params[:industry_id])
      @ad_types = @ad_types.where(industry_id: industry)
    end

    respond_to do |format|
      format.html
      format.json
    end
  end
end

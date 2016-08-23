class ProfileReportsController < ApplicationController
  def show
    @report = ProfileReport.find(params[:id])
    authorize @report

    respond_to do |format|
      format.json { render json: @report }
    end
  end
end

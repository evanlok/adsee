class ProfileReportsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_profile_report, only: [:show, :update]

  def show
    respond_to do |format|
      format.json
    end
  end

  def create
    @report = current_user.profile_reports.build(profile_report_params)
    authorize @report

    respond_to do |format|
      if @report.save
        format.json { render :show, status: :created }
      else
        format.json { render_json_model_errors(@report) }
      end
    end
  end

  def update
    respond_to do |format|
      if @report.update(profile_report_params)
        format.json { render :show }
      else
        format.json { render_json_model_errors(@report) }
      end
    end
  end

  private

  def load_profile_report
    @report = ProfileReport.find(params[:id])
    authorize @report
  end

  def profile_report_params
    params.require(:profile_report).permit(:title, :description, :file_path)
  end
end

class ProfileReportsController < ApplicationController
  before_action :authenticate_user!
  before_action :load_profile_report, only: [:show, :update]
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @reports = policy_scope(ProfileReport).order(created_at: :desc)
    @reports = paginate(@reports, per_page: 25)

    respond_to do |format|
      format.json
    end
  end

  def show
    respond_to do |format|
      format.json
    end
  end

  def create
    @report = current_user.profile_reports.build(profile_report_params)
    authorize @report
    result = Profiles::ProfileReportBuilder.new(@report, params[:ad_account_id]).create

    respond_to do |format|
      if result.created?
        format.json { render :show, status: :created }
      else
        format.json { render_errors(result.error_messages) }
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

  def create_custom_audience(report)
    params = {
      name: report.title,
      description: report.description,
      subtype: 'CUSTOM'
    }

    marketing_api_client = Facebook::MarketingAPIClient.for_user(current_user, params[:ad_account_id])
    response = marketing_api_client.create_custom_audience(params)
    report.update(custom_audience_id: response['id'])
  end
end

class VideoJobsController < ApplicationController
  before_action :load_scene_collection, only: [:preview, :generate]
  after_action :verify_policy_scoped, only: :index

  def index
    @video_jobs = policy_scope(VideoJob)
                    .where(scene_collection_id: params[:scene_collection_id])
                    .order(id: :desc).page(params[:page])

    respond_to do |format|
      format.json
    end
  end

  def preview
    @video_job = VideoGenerator.new(@scene_collection).preview

    respond_to do |format|
      format.json { render :show, status: :created }
    end
  rescue Faraday::ClientError => e
    notify_and_render_error(e)
  end

  def generate
    @video_job = VideoGenerator.new(@scene_collection).generate

    respond_to do |format|
      format.json { render :show, status: :created }
    end
  rescue Faraday::ClientError => e
    notify_and_render_error(e)
  end

  def show
    @video_job = VideoJob.find(params[:id])
    authorize @video_job

    respond_to do |format|
      format.json
    end
  end

  private

  def notify_and_render_error(ex)
    Honeybadger.notify(ex, context: { response_body: ex.response.dig(:body, 'errors') })

    respond_to do |format|
      format.json { render json: { errors: ex.response.dig(:body, 'errors') }, status: :unprocessable_entity }
    end
  end

  def load_scene_collection
    @scene_collection = SceneCollection.find(params[:scene_collection_id])
    authorize @scene_collection, :show?
  end
end

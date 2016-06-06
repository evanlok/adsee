class HalCallbacksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :load_video_job

  def create
    # Ignore request if a more recent video job has been executed
    most_recent_video_job = VideoJob.where(scene_collection_id: @video_job.scene_collection_id).order(:id).last

    if @video_job.id >= most_recent_video_job.id
      params[:videos].each do |video_params|
        import_video(video_params)
      end

      @video_job.scene_collection.generated!
      run_post_generation_tasks
    end

    render json: { status: 'ok' }
  end

  def stream
    @video_job.update(stream_url: params[:stream_url])

    render json: { status: 'ok' }
  end

  def preview
    @video_job.update(stream_url: params[:stream_url])

    render json: { status: 'ok' }
  end

  private

  def import_video(video_params)
    video = Video
              .where(scene_collection_id: @video_job.scene_collection_id,
                     width: video_params[:width],
                     height: video_params[:height])
              .first_or_initialize

    video.attributes = {
      thumbnail_url: params[:thumbnail_url],
      duration: params[:duration],
      url: video_params[:url]
    }

    video.save
  end

  # TODO: Move this to a background job
  def run_post_generation_tasks
    case @video_job.scene_collection.integration
    when 'facebook_ad'
      facebook_ad = @video_job.scene_collection.current_facebook_ad
      Facebook::VideoAdManager.new(facebook_ad).run
    when 'facebook_post'
      Facebook::FeedPoster.new(@video_job.scene_collection).post_to_wall
    when 'facebook_page_post'
      Facebook::FeedPoster.new(@video_job.scene_collection).post_to_page
    end
  end

  def load_video_job
    @video_job = VideoJob.find(params[:video_job_id])
  rescue ActiveRecord::RecordNotFound => e
    Honeybadger.notify(e)
    render json: { errors: ['Record not found'] }, status: :not_found && return
  end
end

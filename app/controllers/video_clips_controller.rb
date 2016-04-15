class VideoClipsController < ApplicationController
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  def index
    @video_clips = policy_scope(VideoClip).order(created_at: :desc).page(params[:page]).per(50)

    respond_to do |format|
      format.json
    end
  end

  def create
    @video_clip = current_user.video_clips.build(video_clip_params)
    authorize @video_clip

    if @video_clip.save
      respond_to do |format|
        format.json
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@video_clip) }
      end
    end
  end

  def destroy
    @video_clip = VideoClip.find(params[:id])
    authorize @video_clip

    respond_to do |format|
      format.json
    end
  end

  private

  def video_clip_params
    params.require(:video_clip).permit(:filename, :original_path, :path, :thumbnail_path, :file_size, :filestack_url)
  end
end

class Admin::VideoClipsController < Admin::BaseController
  def index
    @video_clips = VideoClip.where(user_id: nil).order(id: :desc).page(params[:page]).per(50)
  end

  def create
    @video_clip = VideoClip.new(video_clip_params)

    if @video_clip.save
      VideoClipEncoder.new(@video_clip).encode

      respond_to do |format|
        format.json { render json: @video_clip, status: :created }
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@video_clip) }
      end
    end
  end

  def destroy
    @video_clip = VideoClip.find(params[:id])
    @video_clip.destroy

    redirect_to admin_video_clips_url, notice: "Video Clip deleted: #{@video_clip.filename}"
  end

  private

  def video_clip_params
    params.require(:video_clip).permit(:filename, :original_path, :path, :thumbnail_path, :file_size, :filestack_url)
  end
end

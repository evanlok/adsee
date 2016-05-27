class EncoderCallbacksController < ApplicationController
  skip_before_action :verify_authenticity_token

  def video_clip
    @video_clip = VideoClip.find(params[:id])
    output = params[:outputs].find { |o| o[:label] == 'high' }
    video_url = output[:url]
    thumbnail_url = output.dig(:thumbnail, :url)

    if video_url
      filename = File.basename(video_url)
      duration = params[:input][:duration_in_ms].to_i / 1000
      @video_clip.update(path: "#{@video_clip.base_dir}/#{filename}", duration: duration, thumbnail_url: thumbnail_url)
    end

    render json: { id: @video_clip.id }
  end
end

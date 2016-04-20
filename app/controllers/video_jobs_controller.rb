class VideoJobsController < ApplicationController
  before_action :load_scene_collection, only: [:preview, :generate]

  def preview
    @video_job = VideoGenerator.new(@scene_collection).preview

    respond_to do |format|
      format.json { render :show, status: :created }
    end
  end

  def generate
    @video_job = VideoGenerator.new(@scene_collection).generate

    respond_to do |format|
      format.json { render :show, status: :created }
    end
  end

  def show
    @video_job = VideoJob.find(params[:id])
    authorize @video_job

    respond_to do |format|
      format.json
    end
  end

  private

  def load_scene_collection
    @scene_collection = SceneCollection.find(params[:scene_collection_id])
    authorize @scene_collection, :show?
  end
end

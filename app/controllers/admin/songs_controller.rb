class Admin::SongsController < Admin::BaseController
  before_action :load_song, only: [:edit, :update, :destroy]

  def index
    @songs = Song.includes(:song_category).order(:name).page(params[:page])
  end

  def new
    @song = Song.new
  end

  def create
    @song = Song.new(song_params)

    if @song.save
      redirect_to edit_admin_song_url(@song), notice: "Created Song: #{@song.name}"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @song.update(song_params)
      redirect_to edit_admin_song_url(@song), notice: "Updated Song: #{@song.name}"
    else
      render :edit
    end
  end

  def destroy
    @song.destroy
    redirect_to admin_songs_url, notice: "Deleted Song: #{@song.name}"
  end

  private

  def load_song
    @song = Song.find(params[:id])
  end

  def song_params
    params.require(:song).permit!
  end
end

class Admin::SongCategoriesController < Admin::BaseController
  before_action :load_song_category, only: [:edit, :update, :destroy]

  def index
    @song_categories = SongCategory.order(:name).page(params[:page])
  end

  def new
    @song_category = SongCategory.new
  end

  def create
    @song_category = SongCategory.new(song_category_params)

    if @song_category.save
      redirect_to admin_song_categories_url, notice: "Created SongCategory: #{@song_category.name}"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @song_category.update(song_category_params)
      redirect_to edit_admin_song_category_url(@song_category), notice: "Updated Song Category: #{@song_category.name}"
    else
      render :edit
    end
  end

  def destroy
    @song_category.destroy
    redirect_to admin_song_categories_url, notice: "Deleted Song Category: #{@song_category.name}"
  end

  private

  def load_song_category
    @song_category = SongCategory.find(params[:id])
  end

  def song_category_params
    params.require(:song_category).permit!
  end
end

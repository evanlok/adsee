class Admin::SceneCategoriesController < Admin::BaseController
  before_action :load_scene_category, only: [:edit, :update, :destroy]

  def index
    @scene_categories = SceneCategory.order(:name).page(params[:page])
  end

  def new
    @scene_category = SceneCategory.new
  end

  def create
    @scene_category = SceneCategory.new(scene_category_params)

    if @scene_category.save
      notice = "Created Scene Category: #{@scene_category.name}"
      redirect_to edit_admin_scene_category_url(@scene_category), notice: notice
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @scene_category.update(scene_category_params)
      notice = "Updated Scene Category: #{@scene_category.name}"
      redirect_to edit_admin_scene_category_url(@scene_category), notice: notice
    else
      render :edit
    end
  end

  def destroy
    @scene_category.destroy
    redirect_to admin_scene_categories_url, notice: "Deleted Scene Category: #{@scene_category.name}"
  end

  private

  def load_scene_category
    @scene_category = SceneCategory.find(params[:id])
  end

  def scene_category_params
    params.require(:scene_category).permit!
  end
end

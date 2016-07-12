class Admin::FiltersController < Admin::BaseController
  before_action :load_filter, only: [:edit, :update, :destroy]

  def index
    @filters = Filter.order(:name).page(params[:page])
  end

  def new
    @filter = Filter.new
  end

  def create
    @filter = Filter.new(filter_params)

    if @filter.save
      redirect_to edit_admin_filter_url(@filter), notice: "Created filter: #{@filter.name}"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @filter.update(filter_params)
      redirect_to edit_admin_filter_url(@filter), notice: "Updated filter: #{@filter.name}"
    else
      render :edit
    end
  end

  def destroy
    @filter.destroy
    redirect_to admin_filters_url, notice: "Deleted filter: #{@filter.name}"
  end

  private

  def load_filter
    @filter = Filter.find(params[:id])
  end

  def filter_params
    params.require(:filter).permit!
  end
end

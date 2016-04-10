class Admin::TransitionsController < Admin::BaseController
  before_action :load_transition, only: [:edit, :update, :destroy]

  def index
    @transitions = Transition.order(:name).page(params[:page])
  end

  def new
    @transition = Transition.new
  end

  def create
    @transition = Transition.new(transition_params)

    if @transition.save
      redirect_to edit_admin_transition_url(@transition), notice: "Created Transition: #{@transition.name}"
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @transition.save
      redirect_to edit_admin_transition_url(@transition), notice: "Updated Transition: #{@transition.name}"
    else
      render :edit
    end
  end

  def destroy
    @transition.destroy
    redirect_to admin_transitions_url, notice: "Deleted Transition: #{@transition.name}"
  end

  private

  def load_transition
    @transition = Transition.find(params[:id])
  end

  def transition_params
    params.require(:transition).permit!
  end
end

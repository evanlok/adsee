class Admin::FacebookTargetingSpecsController < Admin::BaseController
  before_action :load_fb_targeting_spec, only: [:edit, :update, :destroy]

  def index
    @fb_targeting_specs = FacebookTargetingSpec.order(:name).page(params[:page])
  end

  def new
    @fb_targeting_spec = FacebookTargetingSpec.new
  end

  def create
    @fb_targeting_spec = FacebookTargetingSpec.new(facebook_targeting_spec_params)

    if @fb_targeting_spec.save
      notice = "Created Facebook Targeting Spec: #{@fb_targeting_spec.name}"
      redirect_to edit_admin_facebook_targeting_spec_url(@fb_targeting_spec), notice: notice
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @fb_targeting_spec.update(facebook_targeting_spec_params)
      notice = "Updated Facebook Targeting Spec: #{@fb_targeting_spec.name}"
      redirect_to edit_admin_facebook_targeting_spec_url(@fb_targeting_spec), notice: notice
    else
      render :edit
    end
  end

  def destroy
    @fb_targeting_spec.destroy
    notice = "Deleted Facebook Targeting Spec: #{@fb_targeting_spec.name}"
    redirect_to admin_facebook_targeting_specs_url, notice: notice
  end

  private

  def load_fb_targeting_spec
    @fb_targeting_spec = FacebookTargetingSpec.find(params[:id])
  end

  def facebook_targeting_spec_params
    params.require(:facebook_targeting_spec).permit!
  end
end

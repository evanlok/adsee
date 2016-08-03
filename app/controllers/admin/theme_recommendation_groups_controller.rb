class Admin::ThemeRecommendationGroupsController < Admin::BaseController
  before_action :load_theme_recommendation_group, only: [:edit, :update, :destroy]
  wrap_parameters include: [*ThemeRecommendationGroup.attribute_names, :theme_ids]

  def index
    @groups = ThemeRecommendationGroup.includes(:themes, ad_type: :industry).joins(:facebook_targeting_spec)
                .order('industries.name, ad_types.name, facebook_targeting_specs.name')
                .page(params[:page]).per(50)
  end

  def new
    @group = ThemeRecommendationGroup.new
  end

  def create
    @group = ThemeRecommendationGroup.new(permitted_params)

    if @group.save
      respond_to do |format|
        format.json { render json: @group, status: :created }
      end
    else
      respond_to do |format|
        format.json { render_json_model_errors(@group) }
      end
    end
  end

  def edit
    @themes = Theme.where(ad_type_id: @group.ad_type_id)
  end

  def update
    if @group.update(permitted_params)
      flash[:notice] = "Updated group for #{@group.ad_type.name} and #{@group.facebook_targeting_spec.name}"
      redirect_to admin_theme_recommendation_groups_url
    else
      render :edit
    end
  end

  def destroy
    @group.destroy
    flash[:notice] = "Deleted group for #{@group.ad_type.name} and #{@group.facebook_targeting_spec.name}"
    redirect_to admin_theme_recommendation_groups_url
  end

  def available_targeting_specs
    ad_type = AdType.find(params[:ad_type_id])
    unavailable_ids = ThemeRecommendationGroup.where(ad_type: ad_type).pluck(:facebook_targeting_spec_id)
    @targeting_specs = FacebookTargetingSpec.where.not(id: unavailable_ids)
  end

  private

  def load_theme_recommendation_group
    @group = ThemeRecommendationGroup.find(params[:id])
  end

  def permitted_params
    params.require(:theme_recommendation_group).permit!
  end
end

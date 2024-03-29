class ThemeRecommendationGroupsController < ApplicationController
  def index
    ad_type = AdType.find(params[:ad_type_id])
    facebook_targeting_spec = FacebookTargetingSpec.find(params[:facebook_targeting_spec_id])
    conditions = {
      theme_recommendation_groups: {
        ad_type_id: ad_type,
        facebook_targeting_spec_id: facebook_targeting_spec
      }
    }

    includes = { themes: [:song, :font, { theme_variants: :video_type, ad_type: :industry }] }
    @theme_recommendation_groups = ThemeRecommendationGroup.where(conditions).includes(includes)

    respond_to do |format|
      format.json
    end
  rescue ActiveRecord::RecordNotFound => e
    render_json_record_not_found(e)
  end
end

class FacebookTargetingSpecsController < ApplicationController
  def index
    @facebook_targeting_specs = FacebookTargetingSpec.all

    respond_to do |format|
      format.json
    end
  end
end

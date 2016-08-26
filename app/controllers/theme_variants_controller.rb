class ThemeVariantsController < ApplicationController
  def show
    @theme_variant = ThemeVariant.find(params[:id])

    respond_to do |format|
      format.json
    end
  end
end

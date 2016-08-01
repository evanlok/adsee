class IndustriesController < ApplicationController
  def index
    @industries = Industry.all

    respond_to do |format|
      format.html
      format.json
    end
  end
end

require 'rails_helper'

RSpec.describe ThemeVariant do
  describe '#display_name' do
    let(:theme_variant) { build(:theme_variant) }

    it 'displays theme name and video type' do
      expect(theme_variant.display_name).to eq("#{theme_variant.theme.name} - #{theme_variant.video_type.name}")
    end
  end
end

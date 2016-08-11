require 'rails_helper'

RSpec.describe ThemeVariant do
  describe '#display_name' do
    let(:theme_variant) { build(:theme_variant, name: nil) }

    it 'displays theme name and video type' do
      expect(theme_variant.display_name).to eq("#{theme_variant.theme.name} - #{theme_variant.video_type.name}")
    end

    context 'when name is set' do
      let(:theme_variant) { build(:theme_variant, name: 'A name') }

      it 'returns name' do
        expect(theme_variant.display_name).to eq('A name')
      end
    end
  end

  describe 'validations' do
    describe '#scene_aspect_ratios_match' do
      let(:scene) { build(:scene, width: 1280, height: 720) }
      let(:theme_variant) { build(:theme_variant, aspect_ratio: '16:9', scenes: [scene]) }
      subject { theme_variant.valid? }

      it { is_expected.to be true }

      context 'when scene aspect_ratio does not match' do
        let(:scene) { build(:scene, width: 720, height: 720) }

        it { is_expected.to be false }

        it 'has errors on scenes' do
          theme_variant.valid?
          expect(theme_variant.errors[:scenes].size).to eq(1)
        end
      end
    end
  end
end

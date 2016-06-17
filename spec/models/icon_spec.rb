require 'rails_helper'

RSpec.describe Icon do
  describe '#url' do
    context 'for google' do
      let(:icon) { build(:icon, vendor: 'google') }

      it 'returns url' do
        expect(icon.url).to eq("https://d15t32v9fjxgrp.cloudfront.net/icons/google/ic_#{icon.name}_black_48dp.png")
      end
    end

    context 'for emojione' do
      let(:icon) { build(:icon, vendor: 'emojione') }

      it 'returns url' do
        expect(icon.url).to eq("https://d15t32v9fjxgrp.cloudfront.net/icons/emojione/#{icon.unicode}.png")
      end
    end
  end
end

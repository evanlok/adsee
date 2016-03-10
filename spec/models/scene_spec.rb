require 'rails_helper'

RSpec.describe Scene do
  let(:scene) { build(:scene, data_attributes: [{ name: 'attr1' }, { name: 'attr2' }]) }

  describe '#attribute_names' do
    it 'returns array of data attribute names' do
      expect(scene.attribute_names).to eq(%w(attr1 attr2))
    end
  end
end

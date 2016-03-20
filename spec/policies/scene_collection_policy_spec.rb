require 'rails_helper'

RSpec.describe SceneCollectionPolicy do
  let(:user) { User.new }
  subject { described_class }

  permissions :create?, :update? do
    it 'grants access if user matches' do
      expect(subject).to permit(user, SceneCollection.new(user: user))
    end

    it 'denies access if user does not match' do
      expect(subject).to_not permit(User.new, SceneCollection.new(user: user))
    end
  end
end

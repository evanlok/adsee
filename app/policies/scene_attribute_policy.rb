class SceneAttributePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.joins(scene_content: :scene_collection).where(scene_collections: { user_id: user })
    end
  end

  def create?
    user.id == record.scene_content.scene_collection.user_id
  end

  alias update? create?
end

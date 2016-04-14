class AddAttachmentToSceneAttributes < ActiveRecord::Migration
  def change
    add_column :scene_attributes, :attachment_type, :string
    add_column :scene_attributes, :attachment_id, :integer
  end
end

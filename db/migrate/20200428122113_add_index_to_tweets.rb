class AddIndexToTweets < ActiveRecord::Migration[5.0]
  def change
    add_index :tweets, :content, length: 32
  end
end

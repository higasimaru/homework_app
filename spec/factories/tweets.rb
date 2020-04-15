FactoryBot.define do
  factory :tweet do
    content { Faker::Lorem.sentence }
    image { File.open("#{Rails.root}/public/images/test_image.jpg") }
    created_at { Faker::Time.between(from: DateTime.now - 2, to: DateTime.now) }
    user
    movie
  end
end
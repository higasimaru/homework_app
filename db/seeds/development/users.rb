100.times do |n|
  name = ('a'..'z').to_a.shuffle[0..5].join
  user = User.find_or_initialize_by(
    nickname: "#{name}",
    email: "user#{n+1}@me.com",
    # activated: true
  )

  if user.new_record?
    user.password = "password"
    password_confirmation = "password"
    user.save!
  end
end

puts "user = #{User.count}"


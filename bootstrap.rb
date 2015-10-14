#!/usr/bin/env ruby

puts "Yebo Ember: Bootstrapping Development Environment."

system "npm install"

puts "Yebo Ember: Creating NPM Links between packages."

yebo_ember = Dir.pwd

# Setup Core Dependencies
Dir.chdir "./packages/core"
system "npm install && bower install"
system "npm link"
Dir.chdir yebo_ember

# Setup Checkouts Dependencies
Dir.chdir "./packages/checkouts"
system "npm link yebo-ember-core"
system "npm install && bower install"
system "npm link"
Dir.chdir yebo_ember

# Setup Main Package Dependencies
Dir.chdir "./packages/storefront"
system "npm link yebo-ember-core"
system "npm link yebo-ember-checkouts"
system "npm install && bower install"
system "npm link"
Dir.chdir yebo_ember

# Setup Auth Dependencies
Dir.chdir "./packages/auth"
system "npm link yebo-ember-core"
system "npm link yebo-ember-storefront"
system "npm install && bower install"
system "npm link"
Dir.chdir yebo_ember

puts "Yebo Ember: Done setting up local packages for development."

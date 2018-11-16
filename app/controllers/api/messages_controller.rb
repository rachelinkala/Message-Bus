class Api::MessagesController < ApplicationController
  
  def create
    message = current_user.messages.create(
      email: current_user.email,
      body: params[:body]
      )
    MessageBus.publish "/chat_channel", messages.attributes
  end
end

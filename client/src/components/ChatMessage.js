import React from 'react';
import { Segment, Divider } from 'semantic-ui-react';

const ChatMessage = ({ body, email = 'anon' }) => (
  <Segment>
    <i>{email}</i>
    <Divider hidden />
    <blockquote>{body}</blockquote>
  </Segment>
)

export default ChatMessage

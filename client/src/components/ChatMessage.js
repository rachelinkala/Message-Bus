import React from 'react'
import { 
  Segment, 
  Divider 
} from 'semantic-ui-react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const MyMessage = styled(Segment)`
  background-color: blue !important;
  color: white !important;
`

const TheirMessage = styled(Segment)`
  background-color: darkgray !important;
`

const ChatMessage = ({ user, user_id, body, email = 'anon' }) => {
  const Message = user_id === user.id ? MyMessage : TheirMessage
  return (
    <Message basic>
      <i>{email}</i>
      <Divider hidden />
      <blockquote>{body}</blockquote>
    </Message>
  )
}

const mapStateToProps = (state) => {
  return { user: state.user }
}

export default connect(mapStateToProps)(ChatMessage)

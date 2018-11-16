import React from 'react';
import { connect } from 'react-redux';
import { setFlash } from '../reducers/flash';
import { addMessage } from '../reducers/messages';
import { 
  Segment, 
  Header,
  Form,
  TextArea,
  Button,
} from 'semantic-ui-react';
import styled from 'styled-components';
import axios from 'axios';
import ChatMessage from './ChatMessage';

const MainWindow = styled(Segment)`
  border: 3px solid black;
  height: 60vh;
  overflow-y: scroll;
  background-color: lightgray;
  border-radius: 10px;
`

const MessageInput = styled(Segment)`
  border-radius: 10px;
  width: 80%;
  margin: 0 auto;
  padding: 10px;
`

const Underline = styled(Header)`
  text-decoration: underline;
`

class ChatWindow extends React.Component {
  state = { message: '' }

  componentDidMount() {
    window.MessageBus.start()
    const { dispatch } = this.props
    dispatch(setFlash('Welcome to React Chat', 'green'))

    window.MessageBus.subscribe("/chat_channel", (data) => {
      dispatch(addMessage(data))
    })
  }

  componentWillUnmount() {
    window.MessageBus.unsubscribe("/chat_channel")
  }

  displayMessages = () => {
    const { messages } = this.props

    if (messages.length)
      return messages.map( (m,i) => <ChatMessage key={i} {...m} /> )
    return (
      <Segment inverted textAlign="center">
        <Header as="h1">No Messages Yet</Header>
      </Segment>
    )
  }

  setMessage = (e) => {
    this.setState({ message: e.target.value })
  }

  addMessage = (e) => {
    e.preventDefault()
    const { message } = this.state
    axios.post('/api/messages', { body: message })
      .then( () => this.setState({ message: '' }) )
  }

  render() {
    return (
      <Segment basic>
        <Underline as="h2" textAlign="center">
          React Chat!
        </Underline>
        <MainWindow basic>
          { this.displayMessages() }
        </MainWindow>
        <MessageInput>
          <Form onSubmit={this.addMessage}>
            <TextArea
              value={this.state.message}
              onChange={this.setMessage}
              placeholder="Say something nice.."
              autofocus
              required
            >
            </TextArea>
            <Segment basic textAlign="center">
              <Button primary>Send Message</Button>
            </Segment>
          </Form>
        </MessageInput>
      </Segment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    messages: state.messages,
  }
}

export default connect(mapStateToProps)(ChatWindow)

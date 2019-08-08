import React, { Component } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import './App.css';
import Question from './Question/Question';
import MessageForm from './Message/MessageForm';
import API_HOST from '../consts';

library.add(fab)
                            
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    }
  }

  componentDidMount() {
    const url = `${API_HOST}questions/`;

    axios.get(url)
      .then((response) => {
        this.setState({
          questions: response.data
        })
      });
  }

  renderFaq() {
    return this.state.questions.map((question) => (
      <Question key={question.id} question={question.question}>
        {question.answer}
      </Question>
    ));
  }

  render() {
    return (
      <div className="container main-container shadows">
        <h2 className="heading"><span>FAQ</span></h2>
        <p>Veja as perguntas mais frequentes sobre o processo de evaluação</p>
        <div className="faq shadows" id="scroll-style">
          {this.renderFaq()}
        </div>
        <h2 className="heading"><span>Não encontrou o que procurava?</span></h2>
        <p>Envie-nos sua dúvida por WhatsApp</p>
        <p><FontAwesomeIcon size="lg" icon={['fab', 'whatsapp']}/>   +55 5266288038</p>
        <h2 className="heading"><span>Ajuda</span></h2>
        <MessageForm />
      </div>
    );
  }
}

export default App;

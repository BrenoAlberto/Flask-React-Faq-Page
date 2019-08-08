import React, { Component } from 'react';
import axios from 'axios';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import './MessageForm.css'
import API_HOST from '../../consts';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
          firstname: "",
          lastname: "",
          subject: "",
          email: "",
          message: "",
          errors: {}
        }

        this.handleFormChange = this.handleFormChange.bind(this);
      }

      handleFormChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
    
        this.setState({[name]: value})
      }

      handleFormClear() {
          this.setState({
            firstname: "",
            lastname: "",
            email: "",
            message: "",
            subject: "",
          })
      }
    
    handleValidation(){
        let {firstname, lastname, email } = this.state;
        let errors = {};
        let formIsValid = true;

        if(!firstname.match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["firstname"] = "Somente letras";
        }

        if(!lastname.match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["lastname"] = "Somente letras";
        }
    
        let lastAtPos = email.lastIndexOf('@');
        let lastDotPos = email.lastIndexOf('.');
    
        if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
           formIsValid = false;
           errors["email"] = "Insira um email válido";
        }
    
        this.setState({errors: errors});
        return formIsValid;
    }
    
      messageSubmit(e){
        e.preventDefault();

        if(this.handleValidation()){
            const url = `${API_HOST}message/`;
            const self = this;
            const data = setData(self.state);
    
            axios.post(url, {
                data: data 
            }).then(postSuccess, postError);

            function postSuccess() {
                self.handleFormClear();
                NotificationManager.success('Sucesso', 'Sua mensagem foi enviada com sucesso')
            }

            function postError() {
                NotificationManager.warning('Tente novamente!', 'Ocorreu um erro ao enviar sua mensagem')
            }
        }
        
        function setData(state) {
            const {firstname, lastname, email, subject, message } = state;
            const data = {first_name: firstname,last_name: lastname, email, subject, message};
            return data;
        }
    }

    render() {
        return (
            <form onSubmit= {this.messageSubmit.bind(this)}>
                <div className="form-row">
                    <div className="col-xs-12 col-md-6 mb-3">
                        <input className="form-control shadows" name="firstname" value={this.state.firstname} onChange={this.handleFormChange} placeholder="Nome" type="text" required/>
                        <span className="input-error">{this.state.errors["firstname"]}</span>
                    </div>
                    <div className="col-xs-12 col-md-6 mb-3">
                        <input className="form-control shadows" name="lastname" value={this.state.lastname} onChange={this.handleFormChange} placeholder="Sobrenome" type="text" required/>
                        <span className="input-error">{this.state.errors["lastname"]}</span>
                    </div>
                </div>
                <div className="form-row">
                    <div className="col-xs-12 col-md-6 mb-3">
                        <input className="form-control shadows" name="subject" value={this.state.subject} onChange={this.handleFormChange} placeholder="Assunto" type="text" />
                    </div>
                    <div className="col-xs-12 col-md-6 mb-3">
                        <input className="form-control shadows" name="email" value={this.state.email} onChange={this.handleFormChange} placeholder="Email" type="text" required/>
                        <span className="input-error">{this.state.errors["email"]}</span>
                    </div>
                </div>
                <div className="mb-4 shadows">
                    <textarea name="message" value={this.state.message} onChange={this.handleFormChange} className="form-control" placeholder="Texto" type="text" rows={10}/>
                </div>
                <button className="btn float-right" type="submit">Enviar</button>
                <NotificationContainer/>
            </form>
        );
    }
} 

export default MessageForm;

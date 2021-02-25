import React, { Component } from 'react';
import shortid from 'shortid';
import ContactForm from './contactForm/ContactForm';
import ContactList from './contactsList/ContactList';
import Filter from './filter/Filter';
import styles from './App.module.css'

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  formSubmitHandler = data => {
    console.log(data);
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  createContact = ({ name, number }) => {
    const sameName = this.state.contacts.find(
      contact => contact.name === name || contact.number === number,
    );
    if (sameName) {
      alert(`This contact is already exists`);
    } else if (name.length === 0 || number.length === 0) {
      alert(`Fill in all the fields`);
    } else {
      const contact = {
        id: shortid.generate(),
        name,
        number,
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };

  getFilteredContacts = (contacts, filterStr) => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterStr.toLowerCase()),
    );
  };

  removeContact = (contactId) => {
this.setState(prevState => ({contacts: prevState.contacts.filter(({id})=> id !== contactId)}))
  }

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = this.getFilteredContacts(contacts, filter);
    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.createContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChangeFilter={this.handleInput} />
        <ContactList contacts={filteredContacts} onRemoveContact={this.removeContact}/>
      </div>
    );
  }
}

export default App;
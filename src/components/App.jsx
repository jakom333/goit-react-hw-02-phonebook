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
    const sameName = this.state.contacts.some(
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

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  removeContact = ({ target }) => {
    const contactId = target.dataset.id;
    this.setState(prevState => ({ contacts: prevState.contacts.filter(({ id }) => id !== contactId) }))
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }

  render() {
    return (
      <div className={styles.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.createContact} />
        <h2>Contacts</h2>
        <Filter value={this.state.filter} onChangeFilter={this.handleInput} />
        <ContactList contacts={this.getFilteredContacts()} onRemoveContact={this.removeContact} />
      </div>
    );
  }
}

export default App;



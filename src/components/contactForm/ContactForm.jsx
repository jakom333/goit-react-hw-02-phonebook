import React, { Component } from 'react';
import shordid from 'shortid';
import styles from './ContactForm.module.css';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  nameInputId = shordid.generate();
  numberInputId = shordid.generate();

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <label htmlFor={this.nameInputId} className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            id={this.nameInputId}
            onChange={this.handleInput}
          />
        </label>
        <label htmlFor={this.numberInputId} className={styles.label}>
          Number
          <input
            className={styles.input}
            type="text"
            name="number"
            value={number}
            id={this.numberInputId}
            onChange={this.handleInput}
          />
        </label>

        <button className={styles.btn} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}

export default ContactForm;

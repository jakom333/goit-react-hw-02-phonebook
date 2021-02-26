import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css'

const Contact = ({ contact, onRemoveContact }) => {
  const removeContact = () => {
    onRemoveContact(contact.id)
  }
  return (
    <p className={styles.item}>
      {contact.name}: <span>{contact.number}</span>
      <button className={styles.btn} type="button" onClick={removeContact}>
        X
      </button>
    </p>
  );
};

Contact.propTypes = {
  contact: PropTypes.shape({
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};

export default Contact;

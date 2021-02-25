import React from 'react';
import Contact from './Contact';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css'

const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(contact => (
        <li className={styles.item} key={contact.id}>
          <Contact
            contact={contact}
            onRemoveContact={() => onRemoveContact(contact.id)}
          />
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onRemoveContact: PropTypes.func.isRequired,
};

export default ContactList;

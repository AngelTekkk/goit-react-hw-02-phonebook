import PropTypes from 'prop-types';
import React, { Component } from 'react';
import s from './ContactList.module.css';

export default class ContactList extends Component {
  static propTypes = {
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      })
    ),
    filter: PropTypes.string,
  };

  render() {
    return (
      <ul className={s.list}>
        {this.props.contacts.map(contact => {
          const filter = this.props.filter.toLowerCase();
          const name = contact.name.toLowerCase();

          if (name.includes(filter)) {
            return (
              <li key={contact.id} id={contact.id} className={s.item}>
                <p>
                  {contact.name}: {contact.number}
                </p>
                <button
                  className={s.button}
                  type="button"
                  onClick={this.props.onClick}
                >
                  Delete
                </button>
              </li>
            );
          }
        })}
      </ul>
    );
  }
}

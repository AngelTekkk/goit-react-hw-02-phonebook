import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import Section from './Section';

export default class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const loginInputId = nanoid();
    const isAlreadyAdded = this.state.contacts.find(
      contact => contact.name === this.state.name
    );

    if (isAlreadyAdded) {
      Notify.failure(`${this.state.name} is already in contacts.`);
    } else {
      Notify.success(`${this.state.name} is added to contacts.`);
      this.setState(prevState => {
        return {
          contacts: [
            ...prevState.contacts,
            {
              name: this.state.name,
              number: this.state.number,
              id: loginInputId,
            },
          ],
        };
      });
    }

    form.reset();
  };

  handleDelete = e => {
    const contactId = e.target.parentNode.id;
    const contactName = this.state.contacts.find(
      contact => contact.id === contactId
    ).name;
    Notify.info(`${contactName} is deleted from contacts.`);
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts.filter(contact => contact.id !== contactId),
        ],
      };
    });
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactForm
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          />
        </Section>
        <Section title="Contacts">
          <Filter onChange={this.handleChange} />
          <ContactList
            contacts={this.state.contacts}
            filter={this.state.filter}
            onClick={this.handleDelete}
          />
        </Section>
      </>
    );
  }
}

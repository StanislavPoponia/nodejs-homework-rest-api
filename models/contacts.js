const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async id => {
  try {
    const contacts = await listContacts();
    const result = contacts.find(i => i.id === id);
    return result || null;
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async id => {
  try {
    const contacts = await listContacts();
    const idx = contacts.findIndex(i => i.id === id);
    if (idx === -1) {
      return null;
    }
    const [result] = contacts.splice(idx, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async data => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: nanoid(),
      ...data,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.error(error.message);
  }
};

const updateContact = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id.toString() === contactId);
    if (index === -1) {
      return null;
    }
    contacts[index] = { id: nanoid(), ...body };
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts[index];
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
// Contact object representation.

class Contact {
    constructor(name, phone, email) {
        this.name = name;
        this.phone = phone;
        this.email = email;
    }
}

// Storage 

class Store {
    static getContacts() {
        let contacts;
        if (localStorage.getItem('vscontacts') === null) {
            contacts = [];
        } else {
            contacts = JSON.parse(localStorage.getItem('vscontacts'));
        }
        return contacts;
    }

    static addContact(contact) {
        const contacts = Store.getContacts();
        contacts.push(contact);
        localStorage.setItem('vscontacts', JSON.stringify(contacts));
    }

    static removeContact(email) {
        const contacts = Store.getContacts();
        contacts.forEach((contact, index) => {
            if (contact.email === email) {
                contacts.splice(index, 1);
            }
        });

        localStorage.setItem('vscontacts', JSON.stringify(contacts));
    }
}



// UI class
class UI {

    // Load and Dispay contacts in UI
    static displayContacts() {
        const contacts = Store.getContacts();
        contacts.forEach((contact) => UI.addContactToList(contact));
    }

    // Add a single contact in UI table
    static addContactToList(contact) {
        const list = document.querySelector('#contact-list');
        const row = document.createElement('tr');
        row.innerHTML = `<td> ${contact.name} </td>
                         <td> ${contact.phone} </td>
                         <td> ${contact.email} </td>
                         <td> <a href="#" class="btn btn-danger btn-sm  delete">X</a></td>`;
        list.appendChild(row);

    }
    // Remove contact from  UI Table
    static deleteContact(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
            UI.showAlert('Contact deleted', 'success');
        }
    }

    // Clear UI input fields 
    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#phone').value = '';
        document.querySelector('#email').value = '';
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#contact-form')
        container.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 1000);
    }
}


// Event Section

// Display contacts on page Load.
document.addEventListener('DOMContentLoaded', UI.displayContacts);




// Add Contact on submit
document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // get values from form input
    const name = document.querySelector('#name').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;

    if (name === '' || phone === '' || email === '') {
        UI.showAlert('please fill in all details', 'danger');
    }
    else {
        // create contact 
        const contact = new Contact(name, phone, email);
        UI.addContactToList(contact);
        Store.addContact(contact);
        UI.clearFields();
        UI.showAlert('Contact updated successfully', 'success');
    }
});


// Delete contacts
document.querySelector('#contact-list').addEventListener('click', (e) => {
    UI.deleteContact(e.target);
    Store.removeContact(e.target.parentElement.previousElementSibling.textContent.trim());
});

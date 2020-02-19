const ContactList = require('../../models/contactList');
const _ = require('lodash');

function _mobileNumberCheck(mobileNumber) {
  const pattern = /(^(\+88|0088|88)?(01){1}[13456789]{1}(\d){8})$/;
  if (pattern.test(mobileNumber)) {
    console.log('valer');
    return true;
  } else {
    console.log('margulis');
    return false
  }
}

//# Add a new contact (name, mobile number)

function create(req, res) {
  if (!req.body.mobile || !req.body.name) { return res.status(400).send('Invalid Input.') }
  if (!_mobileNumberCheck(req.body.mobile)) { return res.status(400).send('Invalid mobile number.') };
  ContactList.findOne({ mobile: req.body.mobile }, (err, existingNumber) => {
    if (err) { return res.status(400).send('Failed to get  List.'); }
    if (existingNumber) { return res.status(201).send('Already exists in List.'); }
    ContactList.create(req.body, (err, createdContact) => {
      if (err) { return res.status(400).send('Failed to create new Contact List.'); }
      res.status(201).send(createdContact);
    });
  });
}

//# Get all the contacts
function get(req, res) {
  ContactList.find({}, (err, contactList) => {
    if (err) { return res.status(400).send('Failed to fetch list.'); }
    if (_.size(contactList) === 0) { return res.status(201).send('Empty Contact List'); }
    return res.status(201).send(contactList);
  });
}

//# Get contact details by a mobile number
//http://localhost:3000/contactList/getContactDetails?mobile=01688211524

function getContactDetails(req, res) {
  const query = req.query //get the mobile number from req query
  console.log(query);
  ContactList.findOne(query, (err, contactDetails) => {
    if (err) { return res.status(400).send('Failed to fetch contact details.'); }
    if (!contactDetails) { return res.status(201).send('Number does not exist in phonebook'); }
    return res.status(201).send(contactDetails);
  });
}

//# Edit a contact number
function update(req, res) {
  const query = req.query //get the mobile number from req query
  if (!req.body.mobile) { return res.status(400).send('Invalid Input.') }
  if (!_mobileNumberCheck(req.body.mobile)) { return res.status(400).send('Invalid mobile number.') };
  ContactList.findOne(query, (err, contactDetails) => {
    if (err) { return res.status(400).send('Failed to fetch contact details.'); }
    if (!contactDetails) { return res.status(200).send('Number does not exist in phonebook'); }
    ContactList.findOne({ mobile: req.body.mobile }, (err, existingNumber) => {
      if (err) { return res.status(400).send('Failed to get  List.'); }
      if (existingNumber) { return res.status(200).send('Already exists in List.'); }
      contactDetails.mobile = req.body.mobile;
      contactDetails.save((err, updatedcontact) => {
        if (err) { return res.status(400).send('Error to update Contact'); }
        return res.status(201).send(updatedcontact);
      });
    });
  });
}

//# Delete a given number

function remove(req, res) {
  const query = req.query //get the mobile number from req query
  ContactList.findOne(query, (err, contactDetails) => {
    if (err) { return res.status(400).send('Failed to fetch contact details.'); }
    if (!contactDetails) { return res.status(200).send('Number does not exist in phonebook'); }
      contactDetails.deleted = true;
      contactDetails.save((err, updatedcontact) => {
        if (err) { return res.status(400).send('Error to delete Contact'); }
        return res.status(201).send('Number deleted');
      });
    });
}



module.exports = {
  create,
  get,
  getContactDetails,
  update,
  remove
};

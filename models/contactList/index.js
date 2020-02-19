const mongoose = require('mongoose'),
 Plugins = require('../../utils/plugins').Plugins,
  Schema = mongoose.Schema;

let ContactListSchema = new Schema({
  createdAt: {type: Date, default: Date.now()},
  name: {type: String},
  mobile: {type: String},
  deleted: {type: Boolean, default: false},
  lastUpdatedAt: {type: Date},
});

ContactListSchema.plugin(Plugins.documentDeleted);

// Export the model
const ContactList = mongoose.model('ContactList', ContactListSchema);
module.exports = ContactList;

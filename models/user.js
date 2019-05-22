'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let fields = {
    
    username: { 
		type: String, 
		mutable: true, 
		search: true
	},
    
    password: { 
		type: String, 
		mutable: true, 
		search: true
	},
    
    description: { 
		type: String, 
		mutable: true, 
		search: true
	},
    
    profile_url: { 
		type: String, 
		mutable: true, 
		search: true
	}
    
};

let ModelSchema = new Schema(fields);

// Helper Functions 
ModelSchema.statics.GetFieldsByOption = function (fieldOptionName) {
    return Object.keys(this.schema.paths).filter(fld =>
        this.schema.paths[fld].options[fieldOptionName]
    );
};

module.exports = mongoose.model('User', ModelSchema);

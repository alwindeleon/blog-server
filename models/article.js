'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let fields = {
    
    title: { 
		type: String, 
		mutable: true, 
		search: true
	},
    
    excerpt: { 
		type: String, 
		mutable: true, 
		search: true
	},
    
    content: { 
		type: String, 
		mutable: true, 
		search: true
	},
    
    published: { 
		type: Boolean, 
		mutable: true, 
		search: true
	},
    
    created: { 
		type: Date,
		default: Date.now, 
		mutable: true, 
		search: true 
	},
    
    author_id: { 
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

module.exports = mongoose.model('Article', ModelSchema);

const { Schema, model } = require('mongoose');

// Schema to create Post model
const thoughtSchema = new Schema(
  {
    thoughtText: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: String,
    reactions: [
      {
        body: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
        username: String,
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Create a virtual property `upvoteCount` that gets the amount of comments per user
// postSchema
//   .virtual('upvoteCount')
//   // Getter
//   .get(function () {
//     return this.meta.upvotes;
//   });

// Initialize our Post model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

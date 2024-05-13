const { Thought, User } = require('../models');

module.exports = {
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
      console.log(err)
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { username: req.body.username },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'thought created, but found no user with that ID' });
      }

      res.json('Created the thought 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

   // update a thought
   async updateThought(req, res) {
    try {
      const dbThoughtData = await Thought.updateOne({ _id: req.params.thoughtId }, req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

   // delete a thought
   async deleteThought(req, res) {
    try {
      const dbThoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

     // add a reaction
     async addReaction(req, res) {
      try {
         const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: {
            body: req.body.body,
            username: req.body.username
          } } },
          { new: true }
        );
        res.json(thought)
      } catch (err) {
        res.status(500).json(err);
        console.log(err)
      }
    },

     // delete a reaction
     async deleteReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: {_id: req.params.reactionId} } },
          { new: true }
        );
        res.json(thought)
      } catch (err) {
        res.status(500).json(err);
      }
    },
};

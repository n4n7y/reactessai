import pkg from 'mongoose';

const { Schema: _Schema, model } = pkg;
const Schema = _Schema;

const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true,
    },
});

const commentModel = model('Comment', CommentSchema);

export { commentModel };
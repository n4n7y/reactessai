import pkg from 'mongoose';

const { Schema: _Schema, model } = pkg;
const Schema = _Schema;

const CarSchema = new Schema({
    designation: {
        type: String,
        unique: true,
        required: true,
    },
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
    ],
});

const carModel = model('Car', CarSchema);

export { carModel };

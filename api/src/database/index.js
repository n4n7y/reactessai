import mng from 'mongoose';
import { config } from 'dotenv'


const { connect, set, connection } = mng;
config()
const mongoUri = process.env.MONGO_URI

const configObj = {

    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,

};

const connectToDB = () => {

    connect(mongoUri, { configObj });
    connection.on('connected', () => console.log('mongodb is running'))
    connection.on('disconnected', () => console.warn('mongodb not connected'))
    set('useCreateIndex', true);

};

export { connectToDB }
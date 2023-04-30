import mongoose from "mongoose";

/*
 * 0 = disconected
 * 1 = connected
 * 2 = connecting
 * 3 = disconecting
 */

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {

    // status of connection
    if( mongoConnection.isConnected ) {
        console.log('Already logged!');
        return;
    }

    // if there is a connection, just use the last one.
    // if there is any status code than 1, then disconnect.
    if ( mongoose.connections.length > 0 ) {

        mongoConnection.isConnected = mongoose.connections[0].readyState;

        if ( mongoConnection.isConnected === 1 ) {
            console.log('Using last connection');
            return;
        }

        // This disconnect is in order to avoid multiple connections in the db.
        await mongoose.disconnect();
    }

    // If there is no env configured, it will be undefined and connects with a void string giving a HTTP 500 Error
    await mongoose.connect( process.env.MONGO_URL || '' );
    mongoConnection.isConnected = 1;
    console.log('Connected to MongoDB', process.env.MONGO_URL);
}

export const disconnect = async () => {

    // if there is any other state than 0, then it will disconnect. If not, it will abort because we're already disconnected
    if( mongoConnection.isConnected === 0) return;
    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('Disconnected from MongoDB')
}
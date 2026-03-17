import mongoose from "mongoose";

const connSchema = new mongoose.Schema({
    callLink: {
        typeof: String,
        required:true
    },
    from: {
        typeof: String
    },
    to: {
        typeof: String
    },
}, {timestamps:true}
);

const Connections = mongoose.model("Connections", connSchema);
export default Connections;
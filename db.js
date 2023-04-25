import mongoose from "mongoose";

dbConnect().catch(err => console.log(err))

let db = {}

// connection to database
async function dbConnect() {
    // this is not an actual password I use for things
    await mongoose.connect("mongodb+srv://ericvcl:eric00852@cluster0.7jrvc.mongodb.net/Cluster0?retryWrites=true&w=majority")
    console.log("connected to the database!")

    // schemas
    const userSchema = new mongoose.Schema({
        username: String,
        full_name: String,
        email: String,
        interest: String,
        major: String,
        grad_date: Date,
        profession: String,
        likes: [String]
    })

    const chatSchema = new mongoose.Schema({
        username: String,
        full_name: String,
        chat: String,
        created_date: Date,
        userID: String
    })

    db.User = mongoose.model("User", userSchema)
    db.Chat = mongoose.model("Chat", chatSchema)

    console.log("created db schemas and models")
}

export default db;
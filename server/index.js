const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())
const mongoose = require("mongoose")
app.use(express.json())
app.use(express.urlencoded())


const MONGODB_URI = "mongodb://lecturer1_db_user:rHe55LSQXKQ4J9hd@ac-lnk8zay-shard-00-00.c0gna6h.mongodb.net:27017,ac-lnk8zay-shard-00-01.c0gna6h.mongodb.net:27017,ac-lnk8zay-shard-00-02.c0gna6h.mongodb.net:27017/bookShelf?ssl=true&replicaSet=atlas-6kaa84-shard-0&authSource=admin&appName=Cluster0"

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Database connected successfully!");
    })
    .catch((error) => {
        console.error("Database connection error:", error);
    });

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    status: {
        type: String,
        required: true,
        enum: ["read", "unread"],
        default: "unread"
    }
})

const Books = mongoose.model("Books", bookSchema)

app.post("/add-book", (req, res) => {
    const {title, author} = req.body
    Books.create({title, author}).then(data => {
        return res.json({success: true, data})
    })
})

app.get("/all-books", (req, res) => {
    Books.find().then(data => {
        return res.json({success: true, data})
    })
})

app.patch("/books/:id/status", async (req, res) => {
    const { id } = req.params
    const { status } = req.body

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, message: "Invalid book ID" })
    }

    if (!["read", "unread"].includes(status)) {
        return res.status(400).json({ success: false, message: "Status must be read or unread" })
    }

    try {
        const book = await Books.findByIdAndUpdate(id, { status }, { new: true, runValidators: true })
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" })
        }

        return res.json({ success: true, data: book })
    } catch (error) {
        console.error("Failed to update book status:", error)
        return res.status(500).json({ success: false, message: "Failed to update book status" })
    }
})

app.delete("/books/:id", async (req, res) => {
    const { id } = req.params

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ success: false, message: "Invalid book ID" })
    }

    try {
        const book = await Books.findByIdAndDelete(id)
        if (!book) {
            return res.status(404).json({ success: false, message: "Book not found" })
        }

        return res.json({ success: true, data: book })
    } catch (error) {
        console.error("Failed to delete book:", error)
        return res.status(500).json({ success: false, message: "Failed to delete book" })
    }
})

app.listen(5000, () => {
    console.log("Server is running");
})
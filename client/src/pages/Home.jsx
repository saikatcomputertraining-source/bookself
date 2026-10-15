import axios from "axios";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Book from "../components/Book";

const getErrorMessage = (error) => error.response?.data?.message || "Please try again."

const Home = () => {
    const [title, setTitle] = useState("")
    const [author, setAuthor] = useState("")
    const [allBooks, setAllBooks] = useState([])

    const fetchBooks = async () => {
        try {
            const response = await axios.get("https://bookshelf-manager-02.vercel.app/all-books")
            setAllBooks(response.data.data || [])
        } catch (error) {
            toast.error(`Could not load books. ${getErrorMessage(error)}`)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await axios.post("https://bookshelf-manager-02.vercel.app/add-book", { title, author })
            toast.success("Books added successfully")
            setTitle("")
            setAuthor("")
            await fetchBooks()
        } catch (error) {
            toast.error(`Could not add book. ${getErrorMessage(error)}`)
        }
    }

    const handleStatusUpdate = async (bookId, status) => {
        if (!bookId) return

        try {
            await axios.patch(`https://bookshelf-manager-02.vercel.app/books/${bookId}/status`, { status })
            toast.success(`Book marked as ${status}`)
            await fetchBooks()
        } catch (error) {
            toast.error(`Could not update book status. ${getErrorMessage(error)}`)
        }
    }

    const handleDeleteBook = async (bookId) => {
        if (!bookId) return

        try {
            await axios.delete(`https://bookshelf-manager-02.vercel.app/books/${bookId}`)
            toast.success("Book deleted successfully")
            await fetchBooks()
        } catch (error) {
            toast.error(`Could not delete book. ${getErrorMessage(error)}`)
        }
    }

    useEffect(() => {
        axios.get("https://bookshelf-manager-02.vercel.app/all-books")
            .then((response) => setAllBooks(response.data.data || []))
            .catch((error) => toast.error(`Could not load books. ${getErrorMessage(error)}`))
    }, [])

    return (
        <div className="max-w-7xl mx-auto mt-5 rounded-5 border p-5 grid grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm">
                <ToastContainer />
                <h1 className="text-3xl font-bold text-slate-800 mb-5">BookShelf Manager Application</h1>
                <form action="" className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label htmlFor="title" className="text-sm font-medium text-slate-700">Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Enter book title"
                            name="title"
                            className="w-full max-w-md border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="author" className="text-sm font-medium text-slate-700">Author</label>
                        <input
                            id="author"
                            type="text"
                            placeholder="Enter author name"
                            name="author"
                            className="w-full max-w-md border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                            value={author}
                            onChange={e => setAuthor(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full max-w-md rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-600 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    >
                        Add Book
                    </button>
                </form>
            </div>
            <div className="space-y-4 pl-4">
                <h2 className="text-2xl font-semibold mb-3">Your Books</h2>
                {allBooks.map((ab) => (
                    <Book key={ab._id} ab={ab} handleStatusUpdate={handleStatusUpdate} handleDeleteBook={handleDeleteBook} />
                ))}
            </div>
        </div>
    );
};

export default Home;
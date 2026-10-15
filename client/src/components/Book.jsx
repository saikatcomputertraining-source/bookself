
const Book = ({ab, handleStatusUpdate, handleDeleteBook}) => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <h3 className="text-lg font-semibold text-slate-800">{ab.title}</h3>
                                <p className="text-sm text-slate-500">by {ab.author}</p>
                                <p className="mt-1 text-sm text-slate-600">Status: {ab.status}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => handleStatusUpdate(ab._id, ab.status === "read" ? "unread" : "read")}
                                    className="rounded-full bg-emerald-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-emerald-600"
                                >
                                    Mark as {ab.status === "read" ? "unread" : "read"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleDeleteBook(ab._id)}
                                    className="rounded-full bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-red-600"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
    );
};

export default Book;
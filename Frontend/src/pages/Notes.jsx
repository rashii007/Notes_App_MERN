import { useEffect, useState } from "react";
import { Plus, Search, LogOut } from "lucide-react";
import ThemeButton from "../components/ThemeButton";
import NoteCard from "../components/NoteCard";
import NoteList from "../components/NoteList";
import NoteForm from "../components/NoteForm";
import { logoutUser } from "../utils/authApi";
import { useNavigate } from "react-router-dom";
import { getAll, createNote, updateNote, deleteNote } from "../utils/noteApi";

const Notes = () => {
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const res = await getAll();
      setNotes(res.notes);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  // Create Note
  const handleCreate = async (data) => {
    try {
      const res = await createNote(data);

      setNotes((prev) => [res.note, ...prev]);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Note
  const handleEdit = (note) => {
    setSelectedNote(note);
    setShowForm(true);
  };

  // Update Note
  const handleUpdate = async (data) => {
    try {
      const res = await updateNote(selectedNote._id, data);

      setNotes((prev) =>
        prev.map((note) => (note._id === selectedNote._id ? res.note : note)),
      );

      setSelectedNote(null);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Note
  const handleDelete = async (id) => {
    try {
      await deleteNote(id);

      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // Pin Note (Frontend Only)
  const handlePin = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note._id === id ? { ...note, isPinned: !note.isPinned } : note,
      ),
    );
  };
  const handleLogout = async () => {
    try {
      await logoutUser();

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  // Search + Category Filter

  const filteredNotes = notes.filter((note) => {
    const searchMatch = note.title.toLowerCase().includes(search.toLowerCase());

    const categoryMatch =
      activeCategory === "All" || note.category === activeCategory;

    return searchMatch && categoryMatch;
  });

  return (
    <div
      className="
      min-h-screen
      bg-slate-100
      dark:bg-slate-950
      transition
      duration-300
      p-6
      "
    >
      <div className="flex justify-end gap-3 mb-5">
        <ThemeButton />

        <button
          onClick={handleLogout}
          className="
      flex items-center gap-2
      px-5 py-2
      rounded-lg
      bg-red-600
      hover:bg-red-700
      text-white
      transition
    "
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div
          className="
          flex
          flex-col
          md:flex-row
          justify-between
          gap-5
          mb-8
          "
        >
          <div>
            <h1
              className="
              text-4xl
              font-bold
              text-slate-900
              dark:text-white
              "
            >
              My Notes
            </h1>

            <p
              className="
              text-slate-600
              dark:text-slate-400
              mt-2
              "
            >
              Manage your thoughts, ideas and important information.
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedNote(null);
              setShowForm(true);
            }}
            className="
            flex
            items-center
            gap-2
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-5
            py-3
            rounded-xl
            "
          >
            <Plus size={20} />
            Add Note
          </button>
        </div>

        {/* Search */}

        <div className="relative mb-8">
          <Search
            className="
            absolute
            left-4
            top-3.5
            text-slate-400
            "
          />

          <input
            type="text"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
            w-full
            pl-12
            py-3
            rounded-xl
            bg-white
            dark:bg-slate-800
            text-slate-900
            dark:text-white
            border
            dark:border-slate-700
            outline-none
            "
          />
        </div>

        {/* Categories */}

        <div className="flex gap-3 flex-wrap mb-8">
          {["All", "Study", "Work", "Ideas", "Personal"].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
              px-4
              py-2
              rounded-full
              transition

              ${
                activeCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-slate-800 dark:text-white"
              }
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notes */}

        <NoteList
          notes={filteredNotes}
          loading={false}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onPin={handlePin}
        />
      </div>

      {/* Form Modal */}

      {showForm && (
        <NoteForm
          editNote={selectedNote}
          onClose={() => {
            setShowForm(false);
            setSelectedNote(null);
          }}
          onSubmit={selectedNote ? handleUpdate : handleCreate}
        />
      )}
    </div>
  );
};

export default Notes;

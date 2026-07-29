import NoteCard from "./NoteCard";
import { FileText } from "lucide-react";

const NoteList = ({ notes, loading, onEdit, onDelete, onPin }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div
          className="
          w-10
          h-10
          border-4
          border-blue-600
          border-t-transparent
          rounded-full
          animate-spin
          "
        />
      </div>
    );
  }

  if (!notes || notes.length === 0) {
    return (
      <div
        className="
        flex
        flex-col
        items-center
        justify-center
        py-20
        text-center
        "
      >
        <FileText
          size={60}
          className="
          text-slate-400
          mb-4
          "
        />

        <h2
          className="
          text-2xl
          font-bold
          text-slate-800
          dark:text-white
          "
        >
          No Notes Found
        </h2>

        <p
          className="
          mt-2
          text-slate-500
          dark:text-slate-400
          "
        >
          Create your first note and start organizing your ideas.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
      grid
      sm:grid-cols-2
      lg:grid-cols-3
      gap-6
      "
    >
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
          onPin={onPin}
        />
      ))}
    </div>
  );
};

export default NoteList;

import { Pin, PinOff, Edit, Trash2, CalendarDays } from "lucide-react";

const NoteCard = ({ note, onEdit, onDelete, onPin }) => {
  return (
    <div
      style={{
        backgroundColor: note.color || "#ffffff",
      }}
      className="
      group
      relative
      rounded-2xl
      p-5
      shadow-md
      hover:shadow-xl
      hover:-translate-y-1
      transition-all
      duration-300
      "
    >
      {/* Pin Button */}
      <button
        onClick={() => onPin(note._id)}
        className="
        absolute
        top-4
        right-4
        p-2
        rounded-full
        bg-white/60
        hover:bg-white
        transition
        "
      >
        {note.isPinned ? (
          <Pin size={18} className="text-yellow-600 fill-yellow-600" />
        ) : (
          <PinOff size={18} className="text-slate-600" />
        )}
      </button>

      {/* Title */}

      <h2
        className="
        text-xl
        font-bold
        text-slate-900
        pr-10
        "
      >
        {note.title}
      </h2>

      {/* Content */}

      <p
        className="
        mt-3
        text-slate-700
        line-clamp-3
        leading-relaxed
        "
      >
        {note.content}
      </p>

      {/* Category */}

      <div className="mt-4 flex items-center justify-between">
        <span
          className="
          px-3
          py-1
          text-sm
          rounded-full
          bg-white/60
          text-slate-800
          font-medium
          "
        >
          {note.category}
        </span>
      </div>

      {/* Footer */}

      <div
        className="
        mt-5
        flex
        items-center
        justify-between
        "
      >
        {/* Date */}

        <div
          className="
          flex
          items-center
          gap-2
          text-sm
          text-slate-600
          "
        >
          <CalendarDays size={16} />

          {note.createdAt
            ? new Date(note.createdAt).toLocaleDateString()
            : "Today"}
        </div>

        {/* Actions */}

        <div
          className="
          flex
          gap-2
          opacity-0
          group-hover:opacity-100
          transition
          "
        >
          <button
            onClick={() => onEdit(note)}
            className="
            p-2
            rounded-lg
            bg-white/70
            hover:bg-blue-600
            hover:text-white
            transition
            "
          >
            <Edit size={17} />
          </button>

          <button
            onClick={() => onDelete(note._id)}
            className="
            p-2
            rounded-lg
            bg-white/70
            hover:bg-red-600
            hover:text-white
            transition
            "
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;

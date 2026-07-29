import { useEffect, useState } from "react";
import { X, Pin } from "lucide-react";


const NoteForm = ({ onSubmit, onClose, editNote }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "Others",
    color: "#fef3c7",
    isPinned: false,
  });


  useEffect(() => {
    if (editNote) {
      setFormData({
        title: editNote.title,
        content: editNote.content,
        category: editNote.category,
        color: editNote.color,
        isPinned: editNote.isPinned,
      });
    }
  }, [editNote]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(formData);

    setFormData({
      title: "",
      content: "",
      category: "Others",
      color: "#fef3c7",
      isPinned: false,
    });
  };

  

  return (
    <div
      className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      p-5
      z-50
      "
    >
     
      <div
        className="
        w-full
        max-w-lg
        bg-white
        dark:bg-slate-900
        rounded-2xl
        shadow-xl
        p-6
        "
      >
        {/* Header */}

        <div
          className="
          flex
          justify-between
          items-center
          mb-6
          "
        >
          <h2
            className="
            text-2xl
            font-bold
            text-slate-900
            dark:text-white
            "
          >
            {editNote ? "Edit Note" : "Create Note"}
          </h2>

          <button
            onClick={onClose}
            className="
            p-2
            rounded-lg
            hover:bg-slate-200
            dark:hover:bg-slate-800
            "
          >
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}

          <input
            type="text"
            name="title"
            placeholder="Note title"
            value={formData.title}
            onChange={handleChange}
            required
            className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            dark:bg-slate-800
            dark:text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

          {/* Content */}

          <textarea
            name="content"
            placeholder="Write your note..."
            rows="5"
            value={formData.content}
            onChange={handleChange}
            required
            className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            resize-none
            dark:bg-slate-800
            dark:text-white
            outline-none
            focus:ring-2
            focus:ring-blue-500
            "
          />

          {/* Category */}

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="
            w-full
            px-4
            py-3
            rounded-xl
            border
            dark:bg-slate-800
            dark:text-white
            "
          >
            <option>Study</option>
            <option>Work</option>
            <option>Ideas</option>
            <option>Personal</option>
            <option>Others</option>
          </select>

          {/* Color */}

          <div>
            <label
              className="
              block
              mb-2
              text-sm
              dark:text-white
              "
            >
              Note Color
            </label>

            <input
              type="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="
              w-16
              h-10
              cursor-pointer
              "
            />
          </div>

          {/* Pin */}

          <button
            type="button"
            onClick={() =>
              setFormData({
                ...formData,
                isPinned: !formData.isPinned,
              })
            }
            className={`
            flex
            items-center
            gap-2
            px-4
            py-2
            rounded-xl
            transition

            ${
              formData.isPinned
                ? "bg-yellow-400 text-black"
                : "bg-slate-200 dark:bg-slate-700 dark:text-white"
            }
            `}
          >
            <Pin size={18} />

            {formData.isPinned ? "Pinned" : "Pin Note"}
          </button>

          {/* Submit */}

          <button
            type="submit"
            className="
            w-full
            py-3
            rounded-xl
            bg-blue-600
            hover:bg-blue-700
            text-white
            font-semibold
            transition
            "
          >
            {editNote ? "Update Note" : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;

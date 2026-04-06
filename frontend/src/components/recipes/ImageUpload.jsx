import { useState } from "react";

export default function ImageUpload({ onSelect }) {
    const [file, setFile] = useState(null);

    const handleChange = (e) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
            onSelect(selected);
        }
    };

    return (
        <label className="cursor-pointer rounded-full bg-black/15 px-5 py-2 text-sm hover:bg-white/25 transition">
            📷 Upload image
            <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleChange}
            />
        </label>
    );
}


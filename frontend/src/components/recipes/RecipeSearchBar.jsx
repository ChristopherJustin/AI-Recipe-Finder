export default function RecipeSearchBar({
    value,
    onChange,
}) {

    return (
        <textarea
            rows={1}
            value={value}
            onChange={onChange}
            placeholder="Search by name or ingredients…"
            className="w-full resize-none rounded-xl bg-black/10 border border-white/10 px-4 py-3 outline-none text-white placeholder-gray-300 focus:border-white/30"
        />
    )
}
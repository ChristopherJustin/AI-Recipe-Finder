export default function ProfileDetails({
    form,
    setForm,
    onSave,
    isSaving,
}) {
    return (
        <div className="rounded-2xl bg-zinc-900/30 p-6 space-y-4">
            <h2 className="text-2xl font-semibold">Profile Details</h2>

            <div className="space-y-3">
                <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Name"
                    className="w-full rounded-xl bg-black/10 border border-white/10 px-4 py-3 text-white outline-none"
                />

                <input
                    type="text"
                    value={form.phone_number}
                    onChange={(e) =>
                        setForm((prev) => ({ ...prev, phone_number: e.target.value }))
                    }
                    placeholder="Phone number"
                    className="w-full rounded-xl bg-black/10 border border-white/10 px-4 py-3 text-white outline-none"
                />

                <input
                    type="text"
                    value={form.email}
                    disabled
                    placeholder="Email"
                    className="w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 text-gray-300 outline-none"
                />
                
            </div>

            <div className="flex justify-center">
                <button
                    onClick={onSave}
                    disabled={isSaving}
                    className="bg-white text-black px-5 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
                >
                    {isSaving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    )
}
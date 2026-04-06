export default function RecipePagination({
    totalPages,
    currentPage,
    setCurrentPage,
}) {

    if (totalPages <= 1) return null

    return (
        <div className="flex justify-center gap-2 pt-4 flex-wrap">

            {Array.from({ length: totalPages }, (_, i) => i + 1)
                .map((page) => (

                    <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded-lg text-sm transition
            ${currentPage === page
                                ? "bg-white text-black"
                                : "bg-black/10 hover:bg-white/20"
                            }`}
                    >
                        {page}
                    </button>

                ))}

        </div>
    )
}
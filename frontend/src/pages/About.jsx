import React from "react";

export default function About() {
    return (
        <div className="min-h-screen bg-purple text-white">
            <section className="pt-20 relative min-h-screen flex flex-col items-center justify-center text-center px-6">

                <div className="w-full max-w-4xl p-10 space-y-6">
                    <h1 className="text-4xl md:text-8xl text-white font-bold ">
                        About This Project
                    </h1>

                    <p className="text-lg md:text-3xl leading-relaxed text-white max-w-2xl mx-auto">
                        This is a portfolio project that uses React for the frontend and FastAPI for the backend.
                        Users can input ingredients, upload images of ingredients, and receive recipe suggestions,
                        including AI-generated ones.
                    </p>
                </div>

            </section>
        </div>
    );
}
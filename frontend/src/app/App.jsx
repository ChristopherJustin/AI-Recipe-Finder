import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Recipes from "../pages/BrowseRecipes.jsx";
import RecipeDetail from "../pages/RecipeDetail.jsx";
import Login from "../pages/Login.jsx"
import SavedRecipes from "../pages/SavedRecipes.jsx";
import ProtectedRoute from "../routes/ProtectedRoute.jsx";
import Navbar from "../components/layout/Navbar.jsx";
import Contact from "../pages/Contact.jsx";
import Footer from "../components/layout/Footer.jsx";
import Pantry from "../pages/Pantry"
import MealPlanner from "../pages/MealPlanner"
import Profile from "../pages/Profile"
import AIRecipeDetail from "../pages/AIRecipeDetail"

export default function App() {
    return (
        <div className="min-h-screen text-white">
            {/* GLOBAL GRADIENT BACKGROUND */}
            <div className="fixed inset-0 -z-10
                bg-gradient-to-b
                from-[#a28cf5]
                via-[#e6c3ff]
                via-[#ffd1dc]
                to-[#ffb199]"/>
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/ai-recipe" element={<AIRecipeDetail />} />
                <Route path="/login" element={<Login />} />
                {/* Protected Routes */}
                <Route
                    path="/saved"
                    element={
                        <ProtectedRoute>
                            <SavedRecipes />
                        </ProtectedRoute>
                    }
                />
                <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                />
                {/* Future upgrades */}
                {/* <Route path="/pantry" element={<Pantry />} />
                <Route path="/meal-planner" element={<MealPlanner />} /> */}
            </Routes>
            <Footer />
        </>
        </div>
    );
}

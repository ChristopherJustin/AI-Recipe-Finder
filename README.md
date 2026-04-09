# AI Recipe Finder
A full-stack AI-powered recipe web app that lets users search recipes by ingredients, generate recipes with AI, detect ingredients from images, and manage saved recipes with secure authentication.

# Live Demo
Frontend: https://ai-recipe-finder-tj8j.vercel.app
Backend API: https://ai-recipe-finder-x8tx.onrender.com/api/v1/

# Tech Stack
Frontend
* React
* Vite
* React Router
* React Query
* Axios
* Tailwind CSS

Backend
* FastAPI
* SQLAlchemy
* Pydantic
* JWT Authentication
* Google Gemini API
* Python SMTP (email service)

Deployment
* Vercel (Frontend)
* Render (Backend)


# Features
* Search recipes by ingredients
* Browse a curated recipe library
* Generate recipes using Google Gemini AI
* Detect ingredients from uploaded food images
* Edit detected ingredients before searching or generating recipes
* Save and remove favorite recipes
* Secure authentication (JWT access + refresh tokens)
* User profile (update info + change password)
* Contact form with backend email delivery
* Retry + fallback logic for AI reliability

# Key API Endpoints
Auth
* POST /api/v1/auth/register
* POST /api/v1/auth/login
* POST /api/v1/auth/refresh
* GET /api/v1/auth/me
Recipes
* POST /api/v1/recipes/search
* GET /api/v1/recipes/all
AI
* POST /api/v1/ai/generate-recipes
Vision
* POST /api/v1/vision/search-from-image
Saved Recipes
* GET /api/v1/saved/
* POST /api/v1/saved/save
* DELETE /api/v1/saved/delete/{id}
Other
* POST /api/v1/contact
* GET /api/v1/health

# Local Setup
1. Clone the repo
   git clone https://github.com/ChristopherJustin/AI-Recipe-Finder.git
   cd AI-Recipe-Finder

3. Backend Setup
   cd backend

   python -m venv venv
   source venv/bin/activate  # (Mac/Linux)
   venv\Scripts\activate   # (Windows)

   pip install -r requirements.txt

   uvicorn app.main:app --reload

3. Frontend Setup
   cd frontend

   npm install
   npm run dev

# Environment Variables
Backend (backend/.env)
ENVIRONMENT=development

DATABASE_URL=sqlite:///./app.db

SECRET_KEY=your-secret-key
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=7

GEMINI_API_KEY=your-gemini-api-key

EMAIL_FROM=your@email.com
EMAIL_TO=your@email.com
EMAIL_PASSWORD=your-app-password

FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=["http://localhost:3000","http://localhost:5173"]

Frontend (frontend/.env)
VITE_API_URL=http://localhost:8000/api/v1

# Future Upgrades
* Add a pantry page where it stores the user's ingredients in the database and allows them to add, remove, or edit ingredients.
* Add a meal planner page to generate weekly meals for the user to make with the ingredients they habe stored inside their pantry.

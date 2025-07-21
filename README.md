# 🎲 New Board Game Website

This is a board game web application powered by the OpenAI API.

## 🚀 Getting Started

To run the project locally, follow these steps:

### 1. 📦 Install Dependencies

From the root of the project, run:

bash
npm install
If there are security or dependency issues, you can run:

bash
Copy
Edit
npm audit fix
Or (if necessary):

bash
Copy
Edit
npm audit fix --force
2. 🏃 Start the Development Server
Once dependencies are installed, start the development server with:

bash
Copy
Edit
npm run dev
3. ⚙️ Setup Environment Variables
You need to create two .env files:

One in the root directory

One inside the backend/ folder

Both .env files should contain the following variables:

env Copy Edit
OPENAI_API_KEY=your_openai_api_key
LOCALHOST_URL=http://localhost:3000

Replace your_openai_api_key with your actual OpenAI API key.

Make sure to restart the development server after adding the .env files so that environment variables are loaded correctly.


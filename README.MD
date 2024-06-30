An online music recommendation application built using TypeScript, designed to recommend songs based on user preferences and friend networks.

Table of Contents
Overview
Features
Installation
Usage
Folder Structure
Dependencies
Contributing
License
Overview
This project is a TypeScript-based implementation of a music recommendation system. It allows users to manage playlists, add friends, and receive song recommendations based on their preferences and their friends' playlists.

Features
Song Management:
Add songs to the library with attributes like genre, tempo, singer, popularity score, and release year.
User Management:
Create users and manage their playlists.
Add friends to users.
Recommendation System:
Recommend songs to users based on similarity index with their existing playlist.
Bonus feature: Recommend songs considering friends' playlists, using a friend similarity index.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/vickky06/music-recommendation-app.git
cd music-recommendation-app
Install dependencies:

bash
Copy code
npm install
Build the TypeScript project:

bash
Copy code
npm run build
Usage
Run the application:

bash
Copy code
npm start
API Usage Example:

The application can be interacted with programmatically through the provided controllers and services. See the src/controllers/MusicRecommendationController.ts file for usage examples.


Dependencies
TypeScript: ^4.4.3

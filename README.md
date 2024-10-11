# WhatsLN

Purpose: To use Jikan API to create a Light Novel Website to display various novels.

Tools Used: React/Express/JavaScript/Jikan OpenAPI/Axios

# How To Run
1. cd ./backend
2. npm start or npm run dev

3. Open a new terminal
4. cd ./frontend
5. npm start

# Start Date
Started -- September 28, 2024

# Phase 1
Created temporary home page that loads the first 25 LNs, 
Single Light Novel for a specific ID. 
Connection between backend and frontend using express. 
Incorporated Jikan API calls to backend.
Developed search bar and show the results up to 40 characters of title.

# Planned-to-do
Fix Styling issues with Main Page, Single Page and Search Bar

Single Page Layout
```
|-------------------------------|   
|            NAVBAR             |       T = Title, AT = Alt. Title, P = Picture
|  T                            |       SYN = Synopsis
|  AT         SYN               |       REC = Recommendation
|  P                            |
|                               |
|   REC                         |
|                               |
|-------------------------------|
```
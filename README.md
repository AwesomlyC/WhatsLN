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
```
Created temporary home page that loads the first 25 LNs, 
Single Light Novel for a specific ID. 
Connection between backend and frontend using express. 
Incorporated Jikan API calls to backend.
Developed search bar and show the results up to 40 characters of title.
```
# Phase 2
```
Add the number of volumes/chapters for each novel in (Single Page) [x]
Add the publishing information and author for each novel in (Single Page) [x]
Add author for each novel in (Home Page)  [x]
Add Status for each novel in (Home Page) and (Single Page)  [x]
Add Score for each novel in (Single Page) [x]
Add Search Page when user press enter on Search Bar (Search Page) [x]
Remove Search Results when user exits the search bar (SearchBar) [x]
Add random manga/anime button to allow user to explore (Home Page) [x]
```
# Phase 3
```
Add Pagination (Home Page, Single Page, Search Page) [x]
Add scroll-to-top button when user scroll passed a certain threshold (Home Page, Single Page, Search Page) [x]
Add "Detailed" or "Grid" form for (Home Page) as to display the results [x]
```
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

# Blog Final Project

## Overview
This project is the culmination of the skills I have acquired in **ITIS 3135: Web Application Development**. The Blog Final Project showcases my ability to build a fully functional web application that includes features such as fetching data from a JSON server, implementing search functionality, sorting, and pagination.

## Features
- **Dynamic Blog Post Display**: Fetches blog data from a JSON server and dynamically displays it on the page.
- **Search Functionality**: Users can search for specific blog posts using keywords.
- **Sorting**: Blog posts can be sorted by date or title.
- **Pagination**: Displays blog posts in paginated views, with navigation controls for easy browsing.
- **Error Handling**: Provides user-friendly error messages if data cannot be loaded.

## Skills Demonstrated
1. **JavaScript**: Implemented dynamic functionality using modern JavaScript features like `fetch`, event listeners, and DOM manipulation.
2. **JSON Server**: Utilized a JSON server to simulate a backend database for storing and retrieving blog posts.
3. **Responsive Design**: Ensured the application is responsive and user-friendly across different devices.
4. **Error Handling**: Incorporated robust error handling for network and data issues.
5. **Search and Sorting**: Developed efficient algorithms to filter and sort data.
6. **Pagination**: Implemented dynamic pagination logic to manage large datasets.

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/cwarre33/BlogFinalProject.git
   ```

2. Navigate to the project directory:
   ```bash
   cd BlogFinalProject
   ```

3. Install the JSON server:
   ```bash
   npm install -g json-server
   ```

4. Start the JSON server:
   ```bash
   json-server --watch db.json --port 3000
   ```

5. Open `index.html` in a web browser to view the application.

## Project Structure
```
BlogFinalProject/
├── server                # Server directory
    └── db.json           # JSON database file
├── frontend              # Frontend directory
    └── js                # JavaScript directory
        ├── details.js    # Details page JavaScript logic
        ├── edit.js       # Edit page JavaScript logic
        ├── index.js      # Index(home) page JavaScript logic
        ├── new.js        # New post page JavaScript logic
    └── css               # CSS directory
        ├── styles.css    # Styling Sheet
    └── details.html      # Details page HTML
    └── edit.html         # Edit page HTML
    └── index.html        # Index page HTML
    └── new.html          # New page HTML
└──README.md              # Project documentation
```

## How It Works
1. The application fetches blog data from the JSON server at `http://localhost:3000/blogs`.
2. Users can search for posts, sort them by date or title, and navigate through pages of posts.
3. All interactions dynamically update the content on the page without requiring a reload.

## Lessons Learned
Through this project, I gained hands-on experience with:
- Connecting a frontend application to a simulated backend using JSON Server.
- Developing a seamless user experience with search, sorting, and pagination.
- Managing asynchronous operations using JavaScript.
- Debugging and handling errors in a web application.

## Acknowledgments
This project is a part of the coursework for **ITIS 3135: Web Application Development** at the University of North Carolina at Charlotte. Special thanks to my instructor and classmates for their guidance and support.

---

Feel free to explore the application and provide feedback!


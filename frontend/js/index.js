"use strict";


// Author: Cameron Warren
 
document.addEventListener("DOMContentLoaded", () => {
    // DOM Elements
    const articlesWrapper = document.querySelector(".articles-wrapper");
    const paginationContainer = document.querySelector(".pagination-container");
    const searchBar = document.querySelector(".search-bar input[type='search']");

    // Constants
    const BASE_URL = "http://localhost:3000/blogs";
    const MAX_CONTENT_LENGTH = 50;
    const POSTS_PER_PAGE = 12;

    // State
    const state = {
        currentPage: 1,
        searchTerm: "",
        sortBy: "date",
        allPosts: [],
    };

    // Utility: Debounce Function
    const debounce = (func, delay) => {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };

    // Utility: Search Filter
    function filterPosts(posts, searchTerm) {
        if (!searchTerm) return posts;

        const term = searchTerm.trim().toLowerCase();
        return posts.filter(({ title = "", content = "", author = "" }) =>
            [title, content, author].some(field => field.toLowerCase().includes(term))
        );
    }

    // Utility: Display Posts
    function renderPosts(posts) {
        articlesWrapper.innerHTML = posts.length
            ? posts.map(post => createPostHTML(post)).join("")
            : "<p>No blogs found.</p>";

        articlesWrapper.querySelectorAll(".article").forEach(article => {
            article.addEventListener("click", () => {
                const id = article.getAttribute("data-id");
                window.location.href = `details.html?id=${id}`;
            });
        });
    }

    // Utility: Generate Post HTML
    function createPostHTML(post) {
        const { id, author, title, content, profile, date } = post;
        const profileImage = profile || "images/default.jpeg";

        return `
            <div class="article" data-id="${id}">
                <article class="card">
                    <div class="card-header">
                        <img src="${profileImage}" alt="${author}" 
                             class="avatar" 
                             onerror="this.src='./default-avatar.jpg'; this.onerror=null;">
                        <div>
                            <a href="details.html?id=${id}">${author} - ${new Date(date).toLocaleDateString()}</a>
                        </div>
                    </div>
                    <div class="card-body">
                        <h3><a href="details.html?id=${id}">${title}</a></h3>
                        <p>${content.length > MAX_CONTENT_LENGTH
                            ? `${content.substring(0, MAX_CONTENT_LENGTH)}...`
                            : content}</p>
                    </div>
                </article>
            </div>
        `;
    }

    // Fetch and Display Posts
    async function loadPosts() {
        try {
            const { currentPage, searchTerm, sortBy, allPosts } = state;

            if (!allPosts.length) {
                const response = await fetch(BASE_URL);
                if (!response.ok) throw new Error(`Failed to fetch posts: ${response.status}`);
                state.allPosts = await response.json();
            }

            const filteredPosts = filterPosts(state.allPosts, searchTerm).sort((a, b) => {
                return sortBy === "date" ? new Date(b.date) - new Date(a.date) : 0;
            });

            const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
            const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

            renderPosts(paginatedPosts);
            renderPagination(filteredPosts.length);
        } catch (error) {
            articlesWrapper.innerHTML = `<p>Error loading posts: ${error.message}</p>`;
            paginationContainer.innerHTML = "";
        }
    }

    // Render Pagination Controls
    function renderPagination(totalCount) {
        const { currentPage } = state;
        const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

        paginationContainer.innerHTML = "";

        if (currentPage > 1) {
            paginationContainer.appendChild(createPageButton("Prev", currentPage - 1));
        }

        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.appendChild(createPageButton(i, i, i === currentPage));
        }

        if (currentPage < totalPages) {
            paginationContainer.appendChild(createPageButton("Next", currentPage + 1));
        }
    }

    // Create Pagination Button
    function createPageButton(label, page, isActive = false) {
        const button = document.createElement("button");
        button.className = `page-btn ${isActive ? "active" : ""}`;
        button.textContent = label;
        button.addEventListener("click", () => {
            state.currentPage = page;
            loadPosts();
        });
        return button;
    }

    // Setup Search Functionality
    function setupSearchBar() {
        searchBar.addEventListener(
            "input",
            debounce(event => {
                state.searchTerm = event.target.value.trim();
                state.currentPage = 1;
                loadPosts();
            }, 300)
        );
    }

    // Initialize
    function init() {
        setupSearchBar();
        loadPosts();
    }

    init();
});

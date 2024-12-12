"use strict";

// Author: Cameron Warren

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".form-container");
    const paginationContainer = document.querySelector(".pagination-container");
    const articlesWrapper = document.querySelector(".articles-wrapper");
    const searchInput = document.querySelector("header .search");

    const baseURL = "http://localhost:3000/blogs";
    const defaultProfileImage = "./images/default.jpeg";
    const usersPerPage = 10;
    let currentPage = 1;

    // Helper Functions
    const fetchWithErrorHandling = async (url, options = {}) => {
        try {
            const response = await fetch(url, options);
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return response;
        } catch (error) {
            console.error("Fetch Error:", error);
            alert("An error occurred. Please try again.");
            throw error;
        }
    };

    const renderBlogs = (blogs) => {
        articlesWrapper.innerHTML = "";
        blogs.forEach((blog) => {
            const blogElement = document.createElement("div");
            blogElement.className = "blog";
            blogElement.innerHTML = `
                <h3>${blog.title}</h3>
                <p>${blog.content}</p>
            `;
            articlesWrapper.appendChild(blogElement);
        });
    };

    const createPaginationButtons = (totalPages, activePage) => {
        paginationContainer.innerHTML = "";
        for (let i = 1; i <= totalPages; i++) {
            const button = document.createElement("button");
            button.className = "page-btn";
            button.textContent = i;
            if (i === activePage) button.classList.add("active");
            button.addEventListener("click", () => {
                document.querySelector(".page-btn.active")?.classList.remove("active");
                button.classList.add("active");
                fetchBlogs(i, searchInput.value.trim());
            });
            paginationContainer.appendChild(button);
        }
    };

    // Fetch Blogs
    const fetchBlogs = async (page, query = "") => {
        const url = `${baseURL}?_page=${page}&_limit=${usersPerPage}&q=${query}`;
        try {
            const response = await fetchWithErrorHandling(url);
            const blogs = await response.json();
            renderBlogs(blogs);

            const totalBlogs = response.headers.get("x-total-count");
            const totalPages = Math.ceil(totalBlogs / usersPerPage);
            createPaginationButtons(totalPages, page);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };

    // Blog Creation
    form.querySelector("button").addEventListener("click", async (e) => {
        e.preventDefault();

        // Retrieve form values
        const title = form.querySelector('div:nth-child(1) input').value.trim();
        const author = form.querySelector('div:nth-child(2) input').value.trim();
        const content = form.querySelector('div:nth-child(3) textarea').value.trim();

        if (!title || !author || !content) {
            alert("Please fill in all fields");
            return;
        }

        const newPost = {
            title,
            author,
            content,
            date: new Date().toISOString(),
            profile: defaultProfileImage,
        };

        try {
            const response = await fetchWithErrorHandling(baseURL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newPost),
            });
            const createdPost = await response.json();
            window.location.href = `details.html?id=${createdPost.id}`;
        } catch (error) {
            console.error("Error creating post:", error);
        }
    });

    // Search Handling
    let debounceTimeout;
    searchInput.addEventListener("input", () => {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const query = searchInput.value.trim();
            fetchBlogs(1, query);
        }, 300);
    });

    // Initialize Pagination and Blogs
    fetchBlogs(currentPage);
});

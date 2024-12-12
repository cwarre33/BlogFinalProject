"use strict";

// Author: Cameron Warren

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");
  const baseURL = "http://localhost:3000/blogs";
  const articleWrapper = document.querySelector(".wrapper");

  // Fetch Blog Details
  async function fetchBlogDetails() {
    try {
      const response = await fetch(`${baseURL}/${postId}`);

      if (!response.ok) {
        throw new Error("Blog not found");
      }

      const blog = await response.json();
      displayBlog(blog);
    } catch (error) {
      console.error("Error fetching blog details:", error);
      showNotification("Unable to load blog. Please try again.", "error");
    }
  }

  // Display Blog
  function displayBlog(blog) {
    articleWrapper.innerHTML = `

      <article class="wrapper">
        <h2>${blog.title}</h2>
        <div class="article-header">
            <img src="${blog.profile}" alt="Profile Image" width="60" height="60" class="avatar">
            <div>By ${blog.author} on ${new Date(blog.date).toLocaleDateString()}</div>
            <div class="btn-container">
                <a href="edit.html?id=${blog.id}" class="accent-btn"><i class="fa-regular fa-pen-to-square"></i> Edit</a>
                <button class="delete-btn"><i class="fa-regular fa-trash-can"></i> Delete</button>
            </div>
        </div>
      <p>${blog.content}</p>
        </article>
    `;

    // Add event listener for delete button
    document.querySelector(".delete-btn").addEventListener("click", async () => {
      try {
        const response = await fetch(`${baseURL}/${postId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          showNotification("Blog successfully deleted.", "success");
          setTimeout(() => {
            window.location.href = "index.html";
          }, 2000);
        } else {
          throw new Error("Failed to delete blog");
        }
      } catch (error) {
        console.error("Error deleting blog:", error);
        showNotification("Unable to delete blog. Please try again.", "error");
      }
    });
  }

  // Show Notification
  function showNotification(message, type) {
    const notificationContainer = document.querySelector(".notification-container");
    const notification = notificationContainer.querySelector(".notification");

    notification.textContent = message;
    notificationContainer.classList.remove("hidden");
    notificationContainer.classList.add(type);

    // Close notification after 3 seconds
    setTimeout(() => {
      notificationContainer.classList.add("hidden");
      notificationContainer.classList.remove(type);
    }, 3000);

    // Close button event listener
    notificationContainer.querySelector(".close").addEventListener("click", () => {
      notificationContainer.classList.add("hidden");
      notificationContainer.classList.remove(type);
    });
  }

  fetchBlogDetails();
});

"use strict";

// Author: Cameron Warren

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id"); // Get the blog post ID from the URL
  const baseURL = "http://localhost:3000/blogs"; // Base URL for JSON Server API
  const form = document.querySelector("form"); // Select the form element
  const notificationContainer = document.querySelector(".notification-container"); // Select notification container
  const notification = document.querySelector(".notification"); // Select notification element
  const closeBtn = document.querySelector(".close"); // Select close button

  // Function to display error messages
  function showError(message) {
    notification.textContent = message; // Set error message
    notificationContainer.classList.remove("hidden"); // Make the container visible
  }

  // Function to hide error messages
  function hideError() {
    notificationContainer.classList.add("hidden"); // Hide the container
    notification.textContent = ""; // Clear the message
  }

  // Attach event listener to close button
  closeBtn.addEventListener("click", () => {
    hideError();
  });

  // Function to fetch post details and populate the form
  async function fetchPostDetails() {
    try {
      const response = await fetch(`${baseURL}/${postId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch post details. Please try again later.");
      }
      const post = await response.json();
      populateForm(post); // Populate form with fetched data
    } catch (error) {
      console.error("Error fetching post details:", error);
      showError(error.message); // Show error message
    }
  }

  // Function to populate the form with fetched blog data
  function populateForm(post) {
    form.querySelector("#title").value = post.title; // Populate title
    form.querySelector("#content").value = post.content; // Populate content
  }

  // Form submit event listener
  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission

    // Get form field values
    const title = form.querySelector("#title").value.trim();
    const content = form.querySelector("#content").value.trim();

    // Validate inputs
    if (title.length < 3 || content.length < 10) {
      showError("Please ensure all fields are valid:\n- Title: At least 3 characters\n- Content: At least 10 characters");
      return;
    }

    // Prepare updated post data
    const updatedPost = {
      id: parseInt(postId),
      title,
      content,
      date: new Date().toISOString(), // Add updated date
    };

    // Send PUT request to update the post
    try {
      const response = await fetch(`${baseURL}/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        throw new Error("Failed to update post. Please try again later.");
      }

      // Redirect to the details page on success
      window.location.href = `details.html?id=${postId}`;
    } catch (error) {
      console.error("Error updating post:", error);
      showError(error.message); // Show error message
    }
  });

  // Fetch post details when the page loads
  fetchPostDetails();
});

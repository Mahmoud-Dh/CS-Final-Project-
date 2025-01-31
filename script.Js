document.addEventListener("DOMContentLoaded", function () {
    // Chat toggle button functionality
    const chatToggle = document.getElementById("chat-toggle");
    const chatBody = document.getElementById("chat-body");

    chatToggle.addEventListener("click", function () {
        if (chatBody.style.display === "none") {
            chatBody.style.display = "flex";
            chatToggle.textContent = "-";
        } else {
            chatBody.style.display = "none";
            chatToggle.textContent = "+";
        }
    });

    // Handle sending messages
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");
    const chatMessages = document.getElementById("chat-messages");

    chatSend.addEventListener("click", function () {
        const message = chatInput.value.trim();
        if (message !== "") {
            const userMessage = document.createElement("p");
            userMessage.textContent = `You: ${message}`;
            chatMessages.appendChild(userMessage);

            chatInput.value = ""; // Clear input field

            // Simulate AI response (Replace with actual AI API integration)
            setTimeout(() => {
                const aiResponse = document.createElement("p");
                aiResponse.textContent = "AI: This is a sample response.";
                aiResponse.style.color = "blue";
                chatMessages.appendChild(aiResponse);

                // Auto-scroll to the latest message
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    });

    // Allow pressing Enter to send messages
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            chatSend.click();
        }
    });
});



// List of courses and their folder names
const courses = [
    { id: "CS-230", name: "Object Oriented Programming" },
    { id: "CS-231", name: "Digital Logic Design" },
    { id: "CS-240", name: "Data Structure" },
    { id: "CS-241", name: "Computer Architecture and Organization" },
    { id: "CS-242", name: "Theory of Computing" },
    { id: "CS-243", name: "Discrete Mathematics for CS" },
    { id: "CS-350", name: "Introduction to Database" },
    { id: "CS-351", name: "Operating Systems" },
    { id: "CS-352", name: "System Analysis and Design" },
    { id: "CS-353", name: "Design and Analysis of Algorithms" },
    { id: "CS-360", name: "Computer Networks" },
    { id: "CS-361", name: "Web Programming" },
    { id: "CS-362", name: "Artificial Intelligence" },
    { id: "CS-363", name: "Principles of Programming Languages" },
    { id: "CS-364", name: "Computing Entrepreneurship and Innovation" },
    { id: "CS-470", name: "Human Computer Interaction" },
    { id: "CS-471", name: "Computer Security" },
    { id: "CS-475", name: "Mobile Computing" },
    { id: "CS-476", name: "Parallel and Distributed Computing" },
    { id: "CS-477", name: "Compiler Design" },
    { id: "CS-478", name: "Computer Graphics" },
    { id: "CS-479", name: "Senior Project 1 in Computer Science" },
    { id: "CS-480", name: "Project Management in Computing" },
    { id: "CS-481", name: "Professional Ethics in Computer Science" }
   
];

/**
 * Function to construct the PDF path dynamically based on course and week.
 * @param {string} courseId - The course ID (e.g., "CS-230").
 * @param {number} weekNumber - The week number (e.g., 2).
 * @returns {string|null} - The constructed PDF file path or null if course not found.
 */
function getPdfPath(courseId, weekNumber) {
    const course = courses.find(c => c.id === courseId);
    if (!course) {
        console.error("Course not found:", courseId);
        return null;
    }
    const folderName = `${course.id} ${course.name}`;
    const fileName = `${course.id}_Week_${weekNumber}.pdf`;
    return `Courses/${folderName}/${fileName}`;
}

/**
 * Initialize the PDF Viewer page with dynamic content and a timer.
 */
function initPage() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("course");
    const week = params.get("week") || "2"; // Default to Week 2 if no week is provided

    const selectedCourse = courses.find(c => c.id === courseId);
    if (!selectedCourse) {
        document.body.innerHTML = `<h1>Course not found</h1>`;
        return;
    }

    const pdfPath = getPdfPath(courseId, week);
    if (!pdfPath) {
        document.body.innerHTML = `<h1>Invalid PDF path</h1>`;
        return;
    }

    document.getElementById("week-title").textContent = `Week ${week}  for ${courseId}`;
    document.getElementById("pdf-viewer").src = pdfPath;

    let seconds = 0;
    setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        document.getElementById("timer").textContent =
            `Time spent: ${hours}h ${minutes}m ${secs}s`;
    }, 1000);
}

/**
 * Dynamically populate chapters on the chapters page for a selected course.
 */
function loadChapters() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get("course");

    const course = courses.find(c => c.id === courseId);
    if (!course) {
        document.body.innerHTML = `<h1>Course not found</h1>`;
        return;
    }

    document.getElementById("course-title").textContent = `${course.id} - ${course.name}`;

    const chapterList = document.getElementById("chapter-list");
for (let week = 2; week <= 14; week++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <span>Week ${week}</span>
        <div>
        <a href="PDF Viewer.html?course=${course.id}&week=${week}" target="_blank">View PDF</a>  
        <a href="quiz.html?course=${course.id}&week=${week}">Take Quiz</a>
        </div>
    `;
    chapterList.appendChild(listItem);
}

}

/**
 * Initialize the correct page based on the content.
 */
if (document.getElementById("course-list")) {
    loadCourses(); // For index.html
} else if (document.getElementById("chapter-list")) {
    loadChapters(); // For chapters_page.html
} else {
    initPage(); // For PDF Viewer page
}


// Generate the course cards dynamically
function loadCourses() {
    const courseList = document.getElementById("course-list");

    courses.forEach(course => {
        const card = document.createElement("a"); // Change div to anchor <a>
        card.className = "course-card"; // Apply the same styling
        card.href = `chapters_page.html?course=${course.id}`; // Make the whole card a link
        card.style.textDecoration = "none"; // Remove underline from link
        card.style.color = "inherit"; // Keep text color unchanged
    
        card.innerHTML = `
            <h2>${course.id}<br><br>${course.name}</h2>
        `;
    
        courseList.appendChild(card); // Add the card to the course list
    });
    
}

// PDF Viewer Chat 
document.addEventListener("DOMContentLoaded", function () {
    // Chat toggle button functionality (optional, for future expandability)
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");
    const chatMessages = document.getElementById("chat-box");

    // Handle sending messages
    chatSend.addEventListener("click", function () {
        const message = chatInput.value.trim(); // Get user input
        if (message !== "") {
            // Display the user's message
            const userMessage = document.createElement("p");
            userMessage.textContent = `You: ${message}`;
            chatMessages.appendChild(userMessage);

            chatInput.value = ""; // Clear input field

            // Simulate AI response (Replace this with your AI backend API integration)
            setTimeout(() => {
                const aiResponse = document.createElement("p");
                aiResponse.textContent = "AI: Let me help you with that!";
                aiResponse.style.color = "blue"; // Style AI responses in blue
                chatMessages.appendChild(aiResponse);

                // Auto-scroll to the latest message
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }, 1000);
        }
    });

    // Allow pressing Enter to send messages
    chatInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            chatSend.click();
        }
    });
});



    //  Timer setup
    let seconds = 0; // Counter for the total seconds spent on the page.
    const maxTime = 3600; // Maximum time (1 hour) in seconds for the progress bar.

    //  Start the timer
    setInterval(() => {
        seconds++; // Increment the seconds counter.

        // Calculate hours, minutes, and seconds
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;

        // Update the timer display
        document.getElementById("timer").textContent =
            `Time spent: ${hours}h ${minutes}m ${secs}s`;

        //Update the progress bar
        const progress = Math.min((seconds / maxTime) * 100, 100); // Calculate progress as a percentage, capped at 100%.
        document.getElementById("timer-bar").style.width = `${progress}%`; // Update the bar's width dynamically.
    }, 1000); // Runs every second (1000 ms).
    // End of the Timer 
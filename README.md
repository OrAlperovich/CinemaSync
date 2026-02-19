Started working on this porject by myself right now.
Worked today on the header - needed to make sure we can travel to each page and that when you're in a certain page that it tells you correctly.
The main job was to find a right bootstrap template and than to allign the logo correctly with the buttons and make sure the links were in order.

I have divided the mock-up i made for the gmar project into different html pages.
Now the main objective is to make sure they all work with each other and that all of the JS logic is working as intended.

I'm going through everything in order to see that i present it the best way i can next week. reviewing every code and paragraph to understand its meaning again.

Checked through a lot of bugs and the assignments itself. Seems good.
Now all thats left is accessibility checks and maybe a day/night mode.

Conclusion And instructions: 

# 🎬 CinemaSync: Operations Optimized

**Live Demo:** [Click here to view the live system]https://oralperovich.github.io/CinemaSync/LandingScreen.html 


---

## 📖 System Description
CinemaSync is a comprehensive, frontend-only web application designed to streamline and optimize daily operations for cinema branches. Built as an interactive mockup, the system bridges the gap between management and floor staff by centralizing three core operational pillars: **Inventory Management**, **Manpower Optimization**, and **Movie Scheduling**. 

The application uses dynamic role-based routing to ensure that Regional Managers, Branch Managers, and Floor Staff only see the modules relevant to their specific jobs, creating a seamless and focused user experience.

---

## 💻 Technologies Used
This project was developed strictly using frontend technologies, with an emphasis on responsive design and dynamic DOM manipulation:
* **HTML5:** Semantic structuring with Accessibility (A11y) standards applied.
* **CSS3:** Custom "Premium Dark" theme utilizing Glassmorphism, CSS variables, and flexbox/grid layouts.
* **JavaScript (ES6+):** Core logic, algorithmic calculations, and dynamic UI rendering.
* **Bootstrap 5:** For responsive layout structures, modals, and toasts.
* **jQuery (3.6.0):** For efficient DOM traversal, event handling, and animations.
* **FontAwesome 6:** Scalable vector iconography.
* **LocalStorage:** Used for session state management (Smart Navigation).
* **JSON / Data Layer:** Mock databases implemented via JS Objects and Arrays to simulate API data fetching.

---

## ✨ Feature Summary
* **🔐 Smart Role-Based Login:** Users select their role (e.g., Branch Manager, Content Specialist), which dynamically alters their dashboard permissions. LocalStorage remembers the session, bypassing the login screen on return visits.
* **📦 Dynamic Inventory Count:** Renders inventory categories dynamically from a JSON-style data layer. Features real-time variance (Diff) calculators that visually flag stock shortages.
* **👥 Manpower Optimization Engine:** A mathematical algorithm that calculates exact staffing needs based on 7 environmental criteria (Day of the week, Weather, Pre-sold tickets, Premiere status, etc.) and distributes them automatically across 4 distinct job roles.
* **📅 Interactive Movie Scheduling:** * **Manual Mode:** A custom Drag & Drop interface to assign movies from a dynamic library to specific screen times.
  * **AI-Assisted Mode:** A parameter-driven wizard that simulates automated scheduling based on selected business goals (e.g., maximizing peak-hour occupancy, prioritizing family films).

---

## 🚀 Run Instructions

### Option 1: Live Web Version (Recommended)
Simply click the "Live Demo" link at the top of this page to view the fully deployed project via GitHub Pages. No installation is required.

### Option 2: Run Locally
1. Navigate to the project folder.
2. Open `LandingScreen.html` in your preferred web browser, OR open the folder in an IDE like VS Code and use the **Live Server** extension.
3. **Login Credentials:** Since this is a mockup, you can enter any email containing an `@` symbol and any password at least 8 characters long to proceed.
4. To reset the app and clear your saved role/branch, click the red "Power/Logout" icon in the top right corner of the navigation bar.

# Web Programming Laboratory (HTML5, CSS & JavaScript)

This repository contains clean, standard-compliant implementations for academic Web Programming Laboratory exercises (Lab 1 through Lab 9), developed in pure HTML5, CSS3, and vanilla JavaScript.

---

## 📂 Repository Structure

```text
d:\wb\
│
├── index.html                    # Central dashboard linking all lab exercises
├── lab_1-3.pdf                   # Lab assignment manual/syllabus
├── README.md                     # Documentation and project overview
│
├── lab1/                         # Lab 1: Multi-Page Book Information Website
│   ├── index.html                # Home page with book list & visual previews
│   ├── killing_floor.html        # Book detail page (Killing Floor)
│   ├── die_trying.html           # Book detail page (Die Trying)
│   └── tripwire.html             # Book detail page (Tripwire)
│
├── lab2/                         # Lab 2: Product Catalog with Table Tag
│   └── index.html                # Product specifications & pricing table
│
├── lab3a/                        # Lab 3 (A): Cultural Festival Registration Form
│   └── index.html                # Form with textboxes, radios, checkboxes, dropdown, etc.
│
├── lab3b/                        # Lab 3 (B): Book Information using Frames
│   ├── index.html                # Classic HTML Frameset (cols="30%, 70%")
│   ├── iframe_version.html       # Modern HTML5 iframe equivalent
│   ├── book_list.html            # Left frame navigation menu
│   ├── default_info.html         # Initial right frame placeholder
│   ├── it_ends_with_us.html      # Book detail view
│   ├── it_starts_with_us.html    # Book detail view
│   ├── ugly_love.html            # Book detail view
│   └── verity.html               # Book detail view
│
├── lab4/                         # Lab 4: Country & Capital Selector with CSS
│   └── index.html                # Dropdown selection with custom CSS font properties
│
├── lab5/                         # Lab 5: College Portal Webpage
│   ├── index.html                # College portal with background, typography & marquee
│   └── campus_bg.svg             # Scalable campus illustration background
│
├── lab6/                         # Lab 6: Bengaluru City Showcase
│   ├── index.html                # Semantic HTML5 city showcase webpage
│   ├── style.css                 # Pure Vanilla CSS3 design system & responsive layout
│   └── images/                   # HD photography (Vidhana Soudha, Lalbagh, Tech Park, Cuisine)
│
├── lab7/                         # Lab 7: Mathematical Calculations Web Page
│   ├── index.html                # Form calculator UI with interactive operand controls
│   ├── style.css                 # Modern dark-mode card styling & responsive grid
│   └── script.js                 # Arithmetic logic (+, -, *, /, %, ^), division-by-zero checks & history
│
├── lab8/                         # Lab 8: User Information Capture & Inter-Page Display
│   ├── index.html                # Registration form (Name, Gender, Mobile, Email, City, State, Country)
│   ├── display.html              # Dynamic user profile card displaying transmitted data
│   ├── style.css                 # Form & profile card design with print/PDF optimization
│   ├── form.js                   # Live validation, sample auto-fill & data passing
│   └── display.js                # Profile rendering from sessionStorage/URL params, edit & JSON export
│
└── lab9/                         # Lab 9: XML Data Table Viewer & Parser
    ├── index.html                # Interactive XML data viewer UI with filter, sort & stat cards
    ├── books.xml                 # Structured XML book catalog dataset
    ├── style.css                 # Oceanic slate dark-mode styling & modal dialogs
    └── script.js                 # DOMParser, node extraction, category filtering, search & XML DOM manipulation
```

---

## 📋 Lab Exercises Overview

### 🔹 Lab 1: Book Information Website (Hyperlinks & Multi-Page Navigation)
* **Objective:** Design a website for book information. The home page contains a book list; clicking a specific book opens its detailed information on a subsequent page with navigation to return home.
* **Key Concepts:** Hyperlinks (`<a>`), unordered lists (`<ul>`, `<li>`), layout tables, semantic navigation.
* **Location:** `lab1/index.html`

---

### 🔹 Lab 2: Product Information Using HTML `<table>` Tag
* **Objective:** Display detailed product information (Product image/photo, name, brand, category, price, and technical specifications) neatly structured using HTML tables.
* **Key Concepts:** `<table>`, `<tr>`, `<th>`, `<td>`, `colspan`, `cellpadding`, `cellspacing`, `border`.
* **Location:** `lab2/index.html`

---

### 🔹 Lab 3 (A): Cultural Festival Registration Form
* **Objective:** Create a creative registration form for participants from various institutions for college cultural festival events.
* **Key Concepts:**
  * **Text boxes:** Participant Name, Institute Name, Email, Contact Number
  * **Option buttons (Radio):** Gender, Participation category (Solo / Team)
  * **Check boxes:** Event choices (Dance, Music, Drama, Quiz, Photography, etc.)
  * **Drop-down list (`<select>`):** Year of Study, State/Region
  * **Text area (`<textarea>`):** Address, special requests/remarks
  * **Action buttons:** Submit (`<input type="submit">`) and Reset (`<input type="reset">`)
* **Location:** `lab3a/index.html`

---

### 🔹 Lab 3 (B): Book Information Website Using Frames
* **Objective:** Divide the screen into two parts using frames: the left part contains the book list, and the right part dynamically displays book details upon clicking a title.
* **Key Concepts:** `<frameset>`, `<frame>`, `target` attribute targeting named frames, and `<noframes>`.
* **Bonus:** A modern `iframe_version.html` is provided for 100% compatibility in HTML5 browsers that deprecate `<frameset>`.
* **Location:** `lab3b/index.html`

---

### 🔹 Lab 4: Country & Capital Selector with CSS
* **Objective:** Create a selection box listing 5 countries. When a user selects a country, its capital is printed next to the list. CSS is used to customize the capital's font properties (**color**, **bold**, and **font size**).
* **Key Concepts:** `<select>`, `onchange` event handler, DOM manipulation (`innerHTML`), CSS font styling (`color`, `font-weight: bold`, `font-size: 22px`).
* **Location:** `lab4/index.html`

---

### 🔹 Lab 5: College Webpage
* **Objective:** Build an institutional webpage adhering to specific design constraints:
  * **(a)** Page title reflects the college name.
  * **(b)** Background image spanning the campus.
  * **(c)** College name placed prominently at the top in large text, followed by the address in a smaller font size.
  * **(d)** List of courses offered, each styled in a **different color**, **style** (italic, oblique, bold, underline), and **typeface** (`Trebuchet MS`, `Georgia`, `Courier New`, `Arial Black`, `Verdana`, `Palatino`).
  * **(e)** Continuous scrolling text (`<marquee>`) displaying upcoming exam schedules, deadlines, and festival dates.
* **Location:** `lab5/index.html`

---

### 🔹 Lab 6: City of Bengaluru Showcase (HTML5 & Modern CSS3)
* **Objective:** Design an aesthetic, modern, and informative web page about Bengaluru (Bangalore) with clean HTML structure and CSS styling.
* **Key Concepts:**
  * **Semantic HTML5:** `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<table>`, `<footer>`, `figure`.
  * **Modern CSS3:** CSS variables, flexbox, CSS grid, glassmorphism (`backdrop-filter`), card hover elevation, responsive media queries.
  * **Content Sections:**
    * Hero section with banner imagery and quick stat badges.
    * History and origin of the name (*Benda-Kaalu-Uru*).
    * Iconic landmarks: **Vidhana Soudha** and **Lalbagh Botanical Garden Glass House**.
    * **Silicon Valley of India**: Technology corridors, IT hubs (Electronic City, Manyata, Whitefield), research institutes (IISc, ISRO).
    * **Culinary Heritage**: Benne Masala Dosa, Filter Kaapi, Thatte Idli, and legendary Darshini cafes.
    * **At-a-Glance Fact Table**: Styled tabular reference of geography, nicknames, and transit.
* **Location:** `lab6/index.html`

---

### 🔹 Lab 7: Mathematical Calculations with Form Elements & JavaScript
* **Objective:** Design a web page to perform mathematical calculations such as addition, subtraction, multiplication, and division using form elements and JavaScript.
* **Key Concepts:**
  * **Form Elements:** `<input type="number">` operands, `<select>` operation dropdown, radio-style operator button matrix (`+`, `−`, `×`, `÷`, `%`, `xʸ`), action buttons (`Calculate`, `Reset Form`, `Swap Numbers`, `Toggle Sign`), and readonly `<input>` result display.
  * **Arithmetic Operations & JavaScript Engine:**
    * Addition: `n1 + n2`
    * Subtraction: `n1 - n2`
    * Multiplication: `n1 * n2`
    * Division: `n1 / n2` with strict zero-division checking and friendly alert handling.
    * Bonus Operations: Modulo (`n1 % n2`) and Exponentiation (`Math.pow(n1, n2)`).
  * **Validation & Precision:** Comprehensive handling for empty fields, `NaN`, floating-point precision round-off (IEEE 754 cleanup up to 8 decimal places), and division-by-zero guards.
  * **Interactive UX:** Clipboard one-click copying, quick test preset chips (instant evaluation test runs), and session calculation history log with reload capability.
* **Location:** `lab7/index.html`

---

### 🔹 Lab 8: User Information Capture & Inter-Page Display
* **Objective:** Design a web page to capture user information (name, gender, mobile number, mail id, city, state, country) using form elements and display them into other pages using JavaScript.
* **Key Concepts:**
  * **Form Capture Controls:**
    * Full Name: `<input type="text" required minlength="2">`
    * Gender: Custom-styled `<input type="radio">` cards for Male, Female, Other
    * Mobile Number: `<input type="tel" pattern="[0-9]{10}" maxlength="10">` with numeric filtering
    * Mail ID: `<input type="email">` with RFC compliant regex pattern validation
    * City: `<input type="text">`
    * State: Grouped `<select>` dropdown (Indian States & Territories)
    * Country: `<select>` dropdown with national flags
  * **Live Client-Side Validation:** Real-time green/red feedback indicators and messages as the user types; prevents invalid submissions.
  * **Inter-Page Data Transmission (JavaScript):**
    * **Web Storage API:** Serializes user record to JSON in `sessionStorage` and `localStorage`.
    * **URL Query Parameters:** Constructs standard query string via `new URLSearchParams(userData)` for URL-based passing (`display.html?name=...`).
  * **Profile Showcase Destination Page (`display.html`):**
    * Dynamically parses received data from storage / URL parameters.
    * Renders an ID Profile Card featuring dynamic avatar monogram (e.g., initials "HR"), verification badge, formatted details grid, and clickable `tel:` and `mailto:` links.
    * Interactive actions: **Edit Information** (redirects back to form with pre-filled fields), **Print Profile / Save as PDF** (`window.print()` with `@media print` optimized CSS), **Export JSON**, and **Clear Profile**.
    * Handles empty states gracefully if accessed directly without submitting data.
* **Location:** `lab8/index.html` (Form) &amp; `lab8/display.html` (Profile Display)

---

### 🔹 Lab 9: XML Data Table Viewer & Parser (DOMParser & JavaScript)
* **Objective:** Design a web page to load, parse, and display XML data into an interactive HTML table using JavaScript.
* **Key Concepts:**
  * **Asynchronous XML Fetching:** Uses the Fetch API / `XMLHttpRequest` to read external `books.xml` without page refreshes.
  * **Safe-Mode Protocol Resilience:** Includes automatic fallback for `file:///` local browsing environments to prevent browser CORS origin-null blocking.
  * **DOMParser Interface:**
    * Instantiates `new DOMParser()`.
    * Parses text into an XML Document Tree via `parseFromString(xmlString, "text/xml")`.
    * Validates against `<parsererror>` tags for well-formedness.
  * **DOM Traversal & Node Extraction:**
    * Extracts node attributes: `node.getAttribute("id")`, `node.getAttribute("category")`.
    * Extracts child element content: `getElementsByTagName("title")[0].textContent`, author, price, year, rating.
  * **Interactive Table Capabilities:**
    * Real-time search filtering across title, author, category, and ID.
    * Category dropdown filter with color-coded badges (Computer Science, Web Development, Cloud Computing, Database, AI, Cybersecurity).
    * Bi-directional column sorting (click any header to sort ASC/DESC).
    * Dynamic aggregation stats strip: Total Books, Unique Categories, Average Price, and Average Rating.
    * Live XML DOM Manipulation: **"+ Add New Book"** modal appends a new `<book>` node into the XML DOM tree, **"Delete"** removes nodes, and **"View / Edit Raw XML"** lets users inspect, edit, or download the updated XML file.
* **Location:** `lab9/index.html` | `lab9/books.xml`
* **Downloads Copy:** Also synchronized at `C:\Users\DELL\Downloads\lab9\lab9\`

---

## 🚀 How to Run and Test

1. Clone or download this repository to your local drive.
2. Open [index.html](index.html) in any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari).
3. Use the interactive launch links in the table to test any individual lab exercise.

---

## 🛠️ Technologies Used
* **HTML5** (Structure, forms, tables, frames, semantic markup)
* **CSS3** (Typography, layouts, color palettes, responsive cards, background images)
* **JavaScript (ES6)** (Event handling and DOM updates)
* **Scalable Vector Graphics (SVG)** (Self-contained vector graphics for book covers, products, and campus illustrations)

---
*Created for Web Programming Laboratory Coursework.*

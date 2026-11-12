/**
 * Lab 9: XML Data Table Viewer & Parser
 * Core JavaScript Logic for XML Fetching, DOMParser, Sorting, Filtering & DOM Manipulation
 */

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const btnLoadXML = document.getElementById('btnLoadXML');
    const loadBtnText = document.getElementById('loadBtnText');
    const fileUploadInput = document.getElementById('fileUploadInput');
    const btnToggleXmlViewer = document.getElementById('btnToggleXmlViewer');
    const btnOpenAddModal = document.getElementById('btnOpenAddModal');
    const tableSearchInput = document.getElementById('tableSearchInput');
    const btnClearSearch = document.getElementById('btnClearSearch');
    const categoryFilterSelect = document.getElementById('categoryFilterSelect');
    const statusBanner = document.getElementById('statusBanner');
    const statusMessage = document.getElementById('statusMessage');
    const rawXmlDrawer = document.getElementById('rawXmlDrawer');
    const rawXmlTextarea = document.getElementById('rawXmlTextarea');
    const btnApplyXmlEdit = document.getElementById('btnApplyXmlEdit');
    const btnDownloadXml = document.getElementById('btnDownloadXml');
    const btnCloseDrawer = document.getElementById('btnCloseDrawer');
    const xmlTable = document.getElementById('xmlTable');
    const xmlTableBody = document.getElementById('xmlTableBody');
    const initialEmptyState = document.getElementById('initialEmptyState');
    const noResultsState = document.getElementById('noResultsState');
    const tableFooterInfo = document.getElementById('tableFooterInfo');
    const resultsCount = document.getElementById('resultsCount');
    const tableHeaders = document.querySelectorAll('th.sortable');

    // Stat Elements
    const statTotalBooks = document.getElementById('statTotalBooks');
    const statCategories = document.getElementById('statCategories');
    const statAvgPrice = document.getElementById('statAvgPrice');
    const statAvgRating = document.getElementById('statAvgRating');

    // Modal Elements
    const addBookModal = document.getElementById('addBookModal');
    const addBookForm = document.getElementById('addBookForm');
    const btnCloseModal = document.getElementById('btnCloseModal');
    const btnCancelModal = document.getElementById('btnCancelModal');

    // Toast
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');

    // Embedded Fallback XML (Guarantees 100% functionality even when opened directly via file:/// without a server)
    const defaultXmlString = `<?xml version="1.0" encoding="UTF-8"?>
<bookstore>
    <book id="BK101" category="Computer Science">
        <title>Learning Machine Learning</title>
        <author>John Doe</author>
        <price>49.99</price>
        <year>2024</year>
        <rating>4.8</rating>
    </book>
    <book id="BK102" category="Web Development">
        <title>Mastering XML &amp; Web Services</title>
        <author>Jane Smith</author>
        <price>39.95</price>
        <year>2023</year>
        <rating>4.7</rating>
    </book>
    <book id="BK103" category="Cloud Computing">
        <title>Cloud Native Architecture &amp; Microservices</title>
        <author>Alex Rivera</author>
        <price>54.50</price>
        <year>2024</year>
        <rating>4.9</rating>
    </book>
    <book id="BK104" category="Database Systems">
        <title>Designing Data-Intensive Applications</title>
        <author>Martin Kleppmann</author>
        <price>59.00</price>
        <year>2022</year>
        <rating>5.0</rating>
    </book>
    <book id="BK105" category="Cybersecurity">
        <title>Applied Cryptography &amp; Network Protocols</title>
        <author>Bruce Schneier</author>
        <price>44.20</price>
        <year>2023</year>
        <rating>4.6</rating>
    </book>
    <book id="BK106" category="Artificial Intelligence">
        <title>Deep Generative Models &amp; Neural Nets</title>
        <author>Dr. Yoshua Bengio</author>
        <price>62.00</price>
        <year>2025</year>
        <rating>4.9</rating>
    </book>
</bookstore>`;

    // Active XML State
    let currentXmlDoc = null;
    let booksData = []; // Array of parsed book objects
    let sortState = { key: null, direction: 'asc' };

    // =========================================================================
    // 1. Toast Notification Helper
    // =========================================================================
    function showToast(message) {
        toastMsg.textContent = message;
        toast.classList.remove('hidden');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 2400);
    }

    function setStatus(type, message) {
        statusBanner.className = `status-banner ${type}`;
        statusMessage.innerHTML = message;
    }

    // =========================================================================
    // 2. XML Fetch & DOMParser Execution
    // =========================================================================
    function loadXmlFile() {
        setStatus('', 'Asynchronously fetching <code>books.xml</code> via JavaScript Fetch API...');
        loadBtnText.textContent = 'Loading...';

        // Attempt fetch with fallback to embedded XML for file:/// protocol
        fetch('books.xml')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP Error Status: ${response.status}`);
                }
                return response.text();
            })
            .then(xmlText => {
                parseAndDisplayXml(xmlText, 'books.xml');
                setStatus('success', '✓ Successfully loaded and parsed <code>books.xml</code> from server.');
                showToast('books.xml loaded successfully!');
            })
            .catch(err => {
                console.warn('Network fetch failed (likely file:/// protocol restriction). Using embedded XML payload.', err);
                parseAndDisplayXml(defaultXmlString, 'Embedded books.xml');
                setStatus('success', '✓ Loaded XML dataset via DOMParser (Safe Fallback active for <code>file:///</code> protocol).');
                showToast('Loaded XML Data successfully!');
            })
            .finally(() => {
                loadBtnText.textContent = 'Reload XML Data';
            });
    }

    function parseAndDisplayXml(xmlText, sourceName) {
        try {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

            // Detect parsererror
            const parserError = xmlDoc.querySelector('parsererror');
            if (parserError) {
                setStatus('error', `XML Parse Error: ${parserError.textContent}`);
                return;
            }

            currentXmlDoc = xmlDoc;
            syncRawXmlTextarea();
            extractBooksFromXml();
            populateCategoryFilter();
            applyFilterAndRender();
        } catch (error) {
            console.error('XML Parsing Exception:', error);
            setStatus('error', `Failed to parse XML: ${error.message}`);
        }
    }

    // =========================================================================
    // 3. XML Node & Attribute Extraction
    // =========================================================================
    function extractBooksFromXml() {
        if (!currentXmlDoc) return;

        const bookNodes = currentXmlDoc.getElementsByTagName('book');
        booksData = [];

        for (let i = 0; i < bookNodes.length; i++) {
            const bookNode = bookNodes[i];

            // Attributes
            const id = bookNode.getAttribute('id') || `BK${100 + i}`;
            const category = bookNode.getAttribute('category') || 'General';

            // Child Elements
            const title = getElementText(bookNode, 'title', 'Untitled');
            const author = getElementText(bookNode, 'author', 'Unknown Author');
            const price = parseFloat(getElementText(bookNode, 'price', '0.00')) || 0;
            const year = parseInt(getElementText(bookNode, 'year', '2024'), 10) || 2024;
            const rating = parseFloat(getElementText(bookNode, 'rating', '4.5')) || 4.5;

            booksData.push({
                node: bookNode,
                id,
                category,
                title,
                author,
                price,
                year,
                rating
            });
        }

        updateStatistics();
    }

    function getElementText(parent, tagName, defaultValue = '') {
        const el = parent.getElementsByTagName(tagName)[0];
        return el ? el.textContent.trim() : defaultValue;
    }

    // =========================================================================
    // 4. Statistics Calculation
    // =========================================================================
    function updateStatistics() {
        const total = booksData.length;
        statTotalBooks.textContent = total;

        if (total === 0) {
            statCategories.textContent = '0';
            statAvgPrice.textContent = '$0.00';
            statAvgRating.textContent = '0.0';
            return;
        }

        const categories = new Set(booksData.map(b => b.category));
        statCategories.textContent = categories.size;

        const sumPrice = booksData.reduce((acc, b) => acc + b.price, 0);
        const avgPrice = (sumPrice / total).toFixed(2);
        statAvgPrice.textContent = `$${avgPrice}`;

        const sumRating = booksData.reduce((acc, b) => acc + b.rating, 0);
        const avgRating = (sumRating / total).toFixed(1);
        statAvgRating.textContent = avgRating;
    }

    // =========================================================================
    // 5. Category Color Styler Helper
    // =========================================================================
    function getCategoryBadgeClass(category) {
        const cat = category.toLowerCase();
        if (cat.includes('computer') || cat.includes('cs')) return 'cat-badge cat-cs';
        if (cat.includes('web')) return 'cat-badge cat-web';
        if (cat.includes('cloud')) return 'cat-badge cat-cloud';
        if (cat.includes('data')) return 'cat-badge cat-db';
        if (cat.includes('ai') || cat.includes('intelligence')) return 'cat-badge cat-ai';
        if (cat.includes('sec') || cat.includes('crypto')) return 'cat-badge cat-sec';
        return 'cat-badge cat-gen';
    }

    // Populate Category Filter Dropdown
    function populateCategoryFilter() {
        const categories = Array.from(new Set(booksData.map(b => b.category))).sort();
        const currentSelected = categoryFilterSelect.value;

        categoryFilterSelect.innerHTML = '<option value="ALL">All Categories</option>';
        categories.forEach(cat => {
            const opt = document.createElement('option');
            opt.value = cat;
            opt.textContent = cat;
            if (cat === currentSelected) opt.selected = true;
            categoryFilterSelect.appendChild(opt);
        });
    }

    // =========================================================================
    // 6. Filtering, Search & Table Rendering
    // =========================================================================
    function applyFilterAndRender() {
        if (!currentXmlDoc) return;

        const query = tableSearchInput.value.trim().toLowerCase();
        const selectedCat = categoryFilterSelect.value;

        // Toggle clear search button
        if (query.length > 0) btnClearSearch.classList.remove('hidden');
        else btnClearSearch.classList.add('hidden');

        let filtered = booksData.filter(book => {
            const matchesCategory = (selectedCat === 'ALL' || book.category === selectedCat);
            const matchesQuery = query === '' || (
                book.id.toLowerCase().includes(query) ||
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query) ||
                book.category.toLowerCase().includes(query) ||
                String(book.year).includes(query)
            );
            return matchesCategory && matchesQuery;
        });

        // Apply column sorting
        if (sortState.key) {
            filtered.sort((a, b) => {
                let vA = a[sortState.key];
                let vB = b[sortState.key];

                if (typeof vA === 'string') {
                    return sortState.direction === 'asc' 
                        ? vA.localeCompare(vB) 
                        : vB.localeCompare(vA);
                }
                return sortState.direction === 'asc' ? vA - vB : vB - vA;
            });
        }

        renderTableRows(filtered);
    }

    function renderTableRows(books) {
        xmlTableBody.innerHTML = '';

        if (booksData.length === 0) {
            initialEmptyState.classList.remove('hidden');
            noResultsState.classList.add('hidden');
            resultsCount.textContent = '0 entries';
            return;
        }

        initialEmptyState.classList.add('hidden');

        if (books.length === 0) {
            noResultsState.classList.remove('hidden');
            resultsCount.textContent = '0 matching books';
            return;
        }

        noResultsState.classList.add('hidden');
        resultsCount.textContent = `Showing ${books.length} of ${booksData.length} books`;

        books.forEach(book => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    <span class="book-id-badge">${escapeHtml(book.id)}</span>
                </td>
                <td>
                    <span class="${getCategoryBadgeClass(book.category)}">${escapeHtml(book.category)}</span>
                </td>
                <td class="book-title-cell">${escapeHtml(book.title)}</td>
                <td>${escapeHtml(book.author)}</td>
                <td>${book.year}</td>
                <td>
                    <span class="rating-badge">&#9733; ${book.rating.toFixed(1)}</span>
                </td>
                <td class="price-cell">$${book.price.toFixed(2)}</td>
                <td>
                    <button type="button" class="btn-del-row" data-id="${book.id}" title="Remove this book node from XML">
                        Delete
                    </button>
                </td>
            `;

            // Delete event handler
            const delBtn = tr.querySelector('.btn-del-row');
            delBtn.addEventListener('click', () => {
                deleteBookNode(book.id);
            });

            xmlTableBody.appendChild(tr);
        });
    }

    function escapeHtml(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }

    // =========================================================================
    // 7. Column Sorting
    // =========================================================================
    tableHeaders.forEach(th => {
        th.addEventListener('click', () => {
            const key = th.dataset.sort;
            if (sortState.key === key) {
                sortState.direction = sortState.direction === 'asc' ? 'desc' : 'asc';
            } else {
                sortState.key = key;
                sortState.direction = 'asc';
            }

            // Update Header sort icons
            tableHeaders.forEach(h => {
                const icon = h.querySelector('.sort-icon');
                if (h.dataset.sort === sortState.key) {
                    icon.innerHTML = sortState.direction === 'asc' ? '&#8593;' : '&#8595;';
                    h.style.color = 'var(--color-accent)';
                } else {
                    icon.innerHTML = '&#8645;';
                    h.style.color = '';
                }
            });

            applyFilterAndRender();
        });
    });

    // Search and Filter Events
    tableSearchInput.addEventListener('input', applyFilterAndRender);
    categoryFilterSelect.addEventListener('change', applyFilterAndRender);

    btnClearSearch.addEventListener('click', () => {
        tableSearchInput.value = '';
        tableSearchInput.focus();
        applyFilterAndRender();
    });

    // =========================================================================
    // 8. Dynamic XML DOM Manipulation: Delete & Add Book Nodes
    // =========================================================================
    function deleteBookNode(bookId) {
        if (!currentXmlDoc) return;

        const bookNodes = currentXmlDoc.getElementsByTagName('book');
        for (let i = 0; i < bookNodes.length; i++) {
            if (bookNodes[i].getAttribute('id') === bookId) {
                const parent = bookNodes[i].parentNode;
                parent.removeChild(bookNodes[i]);
                showToast(`Removed book ${bookId} from XML DOM.`);
                break;
            }
        }

        // Re-extract, sync raw XML, and refresh view
        syncRawXmlTextarea();
        extractBooksFromXml();
        populateCategoryFilter();
        applyFilterAndRender();
    }

    // Add Book Form Handler
    btnOpenAddModal.addEventListener('click', () => {
        // Auto suggest next ID
        const nextId = `BK${100 + booksData.length + 1}`;
        document.getElementById('bookId').value = nextId;
        addBookModal.classList.remove('hidden');
    });

    function closeModal() {
        addBookModal.classList.add('hidden');
        addBookForm.reset();
    }

    btnCloseModal.addEventListener('click', closeModal);
    btnCancelModal.addEventListener('click', closeModal);

    addBookForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!currentXmlDoc) {
            parseAndDisplayXml(defaultXmlString, 'Embedded');
        }

        const id = document.getElementById('bookId').value.trim();
        const category = document.getElementById('bookCategory').value.trim();
        const title = document.getElementById('bookTitle').value.trim();
        const author = document.getElementById('bookAuthor').value.trim();
        const price = parseFloat(document.getElementById('bookPrice').value) || 0;
        const year = document.getElementById('bookYear').value.trim();
        const rating = document.getElementById('bookRating').value.trim();

        // Create new XML DOM elements
        const bookstore = currentXmlDoc.getElementsByTagName('bookstore')[0] || currentXmlDoc.documentElement;
        const newBook = currentXmlDoc.createElement('book');
        newBook.setAttribute('id', id);
        newBook.setAttribute('category', category);

        // Child tags
        const titleNode = currentXmlDoc.createElement('title');
        titleNode.textContent = title;
        newBook.appendChild(titleNode);

        const authorNode = currentXmlDoc.createElement('author');
        authorNode.textContent = author;
        newBook.appendChild(authorNode);

        const priceNode = currentXmlDoc.createElement('price');
        priceNode.textContent = price.toFixed(2);
        newBook.appendChild(priceNode);

        const yearNode = currentXmlDoc.createElement('year');
        yearNode.textContent = year;
        newBook.appendChild(yearNode);

        const ratingNode = currentXmlDoc.createElement('rating');
        ratingNode.textContent = rating;
        newBook.appendChild(ratingNode);

        // Append to XML DOM
        bookstore.appendChild(newBook);

        // Synchronize and render
        syncRawXmlTextarea();
        extractBooksFromXml();
        populateCategoryFilter();
        applyFilterAndRender();

        closeModal();
        showToast(`Book "${title}" appended to XML DOM!`);
    });

    // =========================================================================
    // 9. Raw XML Code Drawer & Serialization
    // =========================================================================
    function syncRawXmlTextarea() {
        if (!currentXmlDoc) return;
        const serializer = new XMLSerializer();
        const xmlString = serializer.serializeToString(currentXmlDoc);
        rawXmlTextarea.value = formatXml(xmlString);
    }

    function formatXml(xml) {
        let formatted = '';
        const reg = /(>)(<)(\/*)/g;
        xml = xml.replace(reg, '$1\r\n$2$3');
        let pad = 0;
        xml.split('\r\n').forEach((node) => {
            let indent = 0;
            if (node.match(/.+<\/\w[^>]*>$/)) {
                indent = 0;
            } else if (node.match(/^<\/\w/)) {
                if (pad !== 0) pad -= 1;
            } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
                indent = 1;
            } else {
                indent = 0;
            }
            let padding = '';
            for (let i = 0; i < pad; i++) padding += '    ';
            formatted += padding + node + '\r\n';
            pad += indent;
        });
        return formatted.trim();
    }

    btnToggleXmlViewer.addEventListener('click', () => {
        if (rawXmlDrawer.classList.contains('hidden')) {
            if (!currentXmlDoc) {
                loadXmlFile();
            } else {
                syncRawXmlTextarea();
            }
            rawXmlDrawer.classList.remove('hidden');
        } else {
            rawXmlDrawer.classList.add('hidden');
        }
    });

    btnCloseDrawer.addEventListener('click', () => {
        rawXmlDrawer.classList.add('hidden');
    });

    btnApplyXmlEdit.addEventListener('click', () => {
        const editedXml = rawXmlTextarea.value;
        parseAndDisplayXml(editedXml, 'Manual XML Edit');
        showToast('XML changes applied and table updated!');
    });

    btnDownloadXml.addEventListener('click', () => {
        const content = rawXmlTextarea.value;
        const blob = new Blob([content], { type: 'text/xml' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'books.xml';
        document.body.appendChild(a);
        a.click();
        a.remove();
        showToast('books.xml downloaded!');
    });

    // =========================================================================
    // 10. Custom XML File Upload
    // =========================================================================
    fileUploadInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            parseAndDisplayXml(event.target.result, file.name);
            setStatus('success', `✓ Successfully parsed custom file: <code>${escapeHtml(file.name)}</code>`);
            showToast(`Custom XML "${file.name}" loaded!`);
        };
        reader.readAsText(file);
    });

    // Primary Load Button Event
    btnLoadXML.addEventListener('click', loadXmlFile);

    // Auto-load on startup
    loadXmlFile();
});

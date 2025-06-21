const letters = {
    reviews: [
        { type: "text", content: "Riley truly cares about the customers. He makes sure they are taken care of every day he works. He goes above and beyond for them. He has purchased groceries for customers when he notices they aren't eating. Riley makes everyone smile.<br><br> - J. F., HEB eStore Manager", label: "Customer Service Award Nomination" },
    ],
    recommendations: [
        // FORMAT 1 (Plain text): { type: "text", content: "Any Text", label: "Any Label" }
        // FORMAT 2 (TXT files): { type: "text-file", src: "...", label: "Any Label" }
        // FORMAT 3 (PDFs and images): { src: "...", label: "Any label" }
        { src: "../images/Riley Underwood Recommendation - Howard Davis.pdf", label: "Howard Davis Recommendation" },
        { src: "../images/Riley Underwood Recommendation - Clint Hance.pdf", label: "Clint Hance Recommendation" },
        { src: "../images/Riley Underwood Recommendation - Emily Moses.pdf", label: "Emily Moses Recommendation" },
    ],
    coverletters: [
        { src: "../images/Cover Letter.pdf", label: "Cover Letter" },
    ]
};

let currentTab = "reviews"; // Default tab
let currentIndex = 0;

function updatePdfSize() {
    const viewer = document.querySelector('.reviews-letter-viewer');
    const pdf = viewer ? viewer.querySelector('.reviews-pdf') : null;
    if (pdf && viewer) {
        const aspect = 8.5 / 11;
        const width = viewer.clientWidth;
        const src = pdf.getAttribute('src'); // Forces the pdf to rerender to keep size scalability.
        const newPdf = document.createElement('embed');
        newPdf.className = 'reviews-pdf';
        newPdf.type = 'application/pdf';
        newPdf.src = src;
        newPdf.style.width = width + "px";
        newPdf.style.height = (width / aspect) + "px";
        pdf.replaceWith(newPdf);
    }
}

// Debounce updatePdfSize so it only runs after resizing stops for 0.5s
let pdfResizeTimeout = null;
function debounceUpdatePdfSize() {
    if (pdfResizeTimeout) clearTimeout(pdfResizeTimeout);
    pdfResizeTimeout = setTimeout(updatePdfSize, 500);
}

function updateViewer() {
    const viewer = document.querySelector('.reviews-letter-viewer');
    const downloadBtn = document.getElementById('reviews-download-btn');
    const labelHeader = document.getElementById('reviews-label-header');
    // Hide/show arrows based on letter count
    const leftArrow = document.querySelector('.reviews-arrow.left');
    const rightArrow = document.querySelector('.reviews-arrow.right');
    const letterCount = letters[currentTab]?.length || 0;
    if (leftArrow && rightArrow) {
        if (letterCount <= 1) {
            leftArrow.style.display = "none";
            rightArrow.style.display = "none";
        } else {
            leftArrow.style.display = "";
            rightArrow.style.display = "";
        }
    }
    let letter = letters[currentTab][currentIndex];
    if (!letter) {
        viewer.innerHTML = "<div class='reviews-text-content reviews-empty'><p class='text'>No letters available.</p></div>";
        downloadBtn.style.display = "none";
        if (labelHeader) labelHeader.style.display = "none";
        return;
    }

    // Set label header
    if (labelHeader) {
        if (letter.label) {
            labelHeader.textContent = letter.label;
            labelHeader.style.display = "";
        } else {
            labelHeader.style.display = "none";
        }
    }

    // Determine file type
    let src = letter.src || "";
    let ext = src.split('.').pop().toLowerCase();
    let html = "";

    // If on phone/tablet and PDF, try to use .txt version instead
    if (ext === "pdf" && window.innerWidth <= 992) {
        // Try to use the .txt version of the file
        let txtSrc = src.replace(/\.pdf$/i, ".txt");
        // Only switch if not already switched
        if (!letter._mobileTxtLoaded) {
            fetch(txtSrc)
                .then(resp => {
                    if (!resp.ok) throw new Error();
                    return resp.text();
                })
                .then(text => {
                    // Mark as loaded so we don't loop
                    letter._mobileTxtLoaded = true;
                    letter.type = "text-file";
                    // console.log(letter.type);
                    letter.content = text.replace(/\n/g, "<br>");
                    letter._originalSrc = letter.src;
                    letter.src = txtSrc;
                    updateViewer();
                })
                .catch(() => {
                    // If txt not found, fallback to PDF
                    letter._mobileTxtLoaded = true;
                    updateViewer();
                });
            viewer.innerHTML = "<div class='reviews-text-content reviews-empty'><p class='text'>Loading...</p></div>";
            downloadBtn.style.display = "";
            return;
        }
    }

    // If it's a .txt file and not already loaded as text-file, fetch and display as text-file
    if (ext === "txt" && !letter.type) {
        fetch(src)
            .then(resp => resp.text())
            .then(text => {
                // Assign type and content so it doesn't fetch again
                letter.type = "text-file";
                letter.content = text.replace(/\n/g, "<br>");
                updateViewer();
            })
            .catch(() => {
                viewer.innerHTML = "<div class='reviews-text-content reviews-empty'><p class='text'>Unable to load text file.</p></div>";
                downloadBtn.style.display = "none";
            });
        // Show loading state
        viewer.innerHTML = "<div class='reviews-text-content reviews-empty'><p class='text'>Loading...</p></div>";
        downloadBtn.style.display = "none";
        return;
    }

    if (letter.type === "text" && letter.content) {
        html = `<div class="reviews-text-content"><p class="text">${letter.content}</p></div>`;
        downloadBtn.style.display = "none";
    } else if (letter.type === "text-file" && letter.content) {
        html = `<div class="reviews-text-content"><p class="text-file">${letter.content}</p></div>`;
        let pdfPath = letter._originalSrc || src.replace(/\.txt$/i, ".pdf");
        let pdfName = pdfPath.split('/').pop();
        downloadBtn.href = pdfPath;
        downloadBtn.setAttribute('download', pdfName);
        downloadBtn.style.display = "";
        viewer.innerHTML = html;
    } else if (["webp", "jpg", "jpeg", "png"].includes(ext)) {
        html = `<div class="reviews-image-wrapper"><img class="reviews-image" src="${src}" alt="${letter.label || ''}"></div>`;
        // Download PDF with same base name if available
        let pdfPath = src.replace(/\.(webp|jpg|jpeg|png)$/i, ".pdf");
        let pdfName = pdfPath.split('/').pop();
        downloadBtn.href = pdfPath;
        downloadBtn.setAttribute('download', pdfName);
        downloadBtn.style.display = "";
    } else if (ext === "pdf") {
        html = `<embed class="reviews-pdf" src="${src}#toolbar=0" type="application/pdf" />`;
        downloadBtn.href = src;
        downloadBtn.setAttribute('download', src.split('/').pop());
        downloadBtn.style.display = "";
    } else {
        html = `<div class='reviews-text-content reviews-empty'><p class='text'>Unsupported file type.</p></div>`;
        downloadBtn.style.display = "none";
    }

    viewer.innerHTML = html;

    // If PDF, update size after rendering
    if (ext === "pdf") {
        setTimeout(updatePdfSize, 0);
    }
}

function updateScrollbar() {
    const scrollbar = document.querySelector('.reviews-scrollbar');
    scrollbar.innerHTML = "";
    if (!letters[currentTab] || letters[currentTab].length <= 1) return;
    letters[currentTab].forEach((_, idx) => {
        const dot = document.createElement('div');
        dot.className = "reviews-scrollbar-dot" + (idx === currentIndex ? " active" : "");
        dot.onclick = () => { currentIndex = idx; updateViewer(); updateScrollbar(); };
        scrollbar.appendChild(dot);
    });
}

function setupTabsAndArrows() {
    document.querySelectorAll('.reviews-tab').forEach(tab => {
        tab.onclick = function() {
            document.querySelectorAll('.reviews-tab').forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');
            currentTab = this.dataset.tab;
            currentIndex = 0;
            updateViewer();
            updateScrollbar();
        };
    });

    document.querySelector('.reviews-arrow.left').onclick = function() {
        if (!letters[currentTab] || letters[currentTab].length < 2) return;
        currentIndex = (currentIndex - 1 + letters[currentTab].length) % letters[currentTab].length;
        updateViewer();
        updateScrollbar();
    };
    document.querySelector('.reviews-arrow.right').onclick = function() {
        if (!letters[currentTab] || letters[currentTab].length < 2) return;
        currentIndex = (currentIndex + 1) % letters[currentTab].length;
        updateViewer();
        updateScrollbar();
    };
}

// Initialize the tabs and arrows when the document is ready
document.addEventListener('DOMContentLoaded', function() {
    setupTabsAndArrows();
    updateViewer();
    updateScrollbar();

    // Use debounced resize/orientation handler
    window.addEventListener('resize', debounceUpdatePdfSize);
    window.addEventListener('orientationchange', debounceUpdatePdfSize);
});
const letters = {
    recommendations: [
        { src: "../images/Riley Underwood Recommendation - Howard Davis.pdf", label: "Howard Davis Recommendation" },
        { src: "../images/Riley Underwood Recommendation - Clint Hance.pdf", label: "Clint Hance Recommendation" },
        { src: "../images/Riley Underwood Recommendation - Emily Moses.pdf", label: "Emily Moses Recommendation" },
    ],
    reviews: [
        // { src: "...", label: "Review 1" }
        { src: "../images/Riley Underwood Recommendation - Emily Moses.txt", label: "Emily Moses Recommendation Text" },
    ],
    coverletters: [
        // { src: "...", label: "Cover Letter 1" }
        { type: "text", content: "This is a sample text content for Emily Moses' recommendation." },
        { type: "text-file", content: "I am pleased to recommend Riley as he embarks on his career in software development. Though early in his journey, Riley has already demonstrated the qualities that make for a great developer: creativity, dedication, and a strong work ethic. His passion for learning is evident in his willingness to take on new challenges, and I have no doubt that he will quickly adapt and grow in a professional development environment.<br><br>Beyond his technical potential, Riley is a fantastic person to work with. He is kind, collaborative, and has a great sense of humor—qualities that make him a positive presence in any team setting. His ability to juggle multiple jobs while pursuing his goals speaks to his perseverance and determination.<br><br>I believe Riley would be an asset to any software development team. He approaches problems with a can-do attitude, is eager to learn from those around him, and brings a creative perspective to his work. I have no doubt that, given the opportunity, he will excel and contribute meaningfully to any project he takes on.<br><br>Please feel free to reach out if you’d like to discuss Riley further—I’d be happy to elaborate on why I believe he has a bright future in software development.<br><br>Best,<br><br>Emily Moses" },
    ]
};

let currentTab = "recommendations";
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
    let letter = letters[currentTab][currentIndex];
    if (!letter) {
        viewer.innerHTML = "<div class='reviews-empty'>No letters available.</div>";
        downloadBtn.style.display = "none";
        return;
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
            viewer.innerHTML = "<div class='reviews-empty'>Loading...</div>";
            downloadBtn.style.display = "none";
            return;
        }
        // If we already tried loading txt and failed, fall through to PDF logic
        if (letter.type === "text-file" && letter.content) {
            html = `<div class="reviews-text-content"><p class="text-file">${letter.content}</p></div>`;
            downloadBtn.style.display = "none";
            viewer.innerHTML = html;
            return;
        }
        // If txt failed, restore original src for PDF
        if (letter._originalSrc) {
            letter.src = letter._originalSrc;
            ext = "pdf";
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
                viewer.innerHTML = "<div class='reviews-empty'>Unable to load text file.</div>";
                downloadBtn.style.display = "none";
            });
        // Show loading state
        viewer.innerHTML = "<div class='reviews-empty'>Loading...</div>";
        downloadBtn.style.display = "none";
        return;
    }

    if (letter.type === "text" && letter.content) {
        html = `<div class="reviews-text-content"><p class="text">${letter.content}</p></div>`;
        downloadBtn.style.display = "none";
    } else if (letter.type === "text-file" && letter.content) {
        html = `<div class="reviews-text-content"><p class="text-file">${letter.content}</p></div>`;
        downloadBtn.style.display = "none";
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
        html = `<div class='reviews-empty'>Unsupported file type.</div>`;
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
const letters = {
    recommendations: [
        { src: "../images/Riley Underwood Recommendation - Howard Davis.pdf", label: "Howard Davis Recommendation" },
        { src: "../images/Riley Underwood Recommendation - Clint Hance.pdf", label: "Clint Hance Recommendation" },
        { src: "../images/Riley Underwood Recommendation - Emily Moses.pdf", label: "Emily Moses Recommendation" },
    ],
    reviews: [
        // { src: "...", label: "Review 1" }
    ],
    coverletters: [
        // { src: "...", label: "Cover Letter 1" }
    ]
};

let currentTab = "recommendations";
let currentIndex = 0;

function updateViewer() {
    const viewer = document.querySelector('.reviews-letter-viewer');
    const downloadBtn = document.getElementById('reviews-download-btn');
    const letter = letters[currentTab][currentIndex];
    if (!letter) {
        viewer.innerHTML = "<div class='reviews-empty'>No letters available.</div>";
        downloadBtn.style.display = "none";
        return;
    }
    viewer.innerHTML = `<embed class="reviews-pdf" src="${letter.src}#toolbar=0" type="application/pdf" />`;
    downloadBtn.href = letter.src;
    downloadBtn.style.display = "";
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
});

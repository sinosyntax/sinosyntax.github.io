const moreLink = document.getElementById('moreLink');
if (moreLink) {
    moreLink.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        const hiddenContentDiv = document.querySelector('.hidden-content');

        const computedDisplay = window.getComputedStyle(hiddenContentDiv).display;

        if (computedDisplay === 'none' || computedDisplay === '') {
            hiddenContentDiv.style.display = 'block';
            e.target.textContent = 'Less'; // Change the link text to "Less"
        } else {
            hiddenContentDiv.style.display = 'none';
            e.target.textContent = 'More'; // Change the link text back to "More"
        }
    });
}
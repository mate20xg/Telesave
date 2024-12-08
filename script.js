document.getElementById('linkForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const channelLink = document.getElementById('channelLink').value.trim();
    const label = document.getElementById('label').value.trim();
    const category = document.getElementById('category').value.trim();
    const icon = document.getElementById('iconSelector').value;

    if (channelLink && label && category) {
        const linkData = { link: channelLink, label: label, category: category, icon: icon };

        let links = JSON.parse(localStorage.getItem('links')) || [];
        links.push(linkData);
        localStorage.setItem('links', JSON.stringify(links));

        displayLinks();
        document.getElementById('linkForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});

function displayLinks() {
    const channelList = document.getElementById('channelList');
    channelList.innerHTML = '';

    const links = JSON.parse(localStorage.getItem('links')) || [];
    links.forEach((linkData, index) => {
        const card = document.createElement('div');
        card.classList.add('card');

        const fullLink = `https://t.me/s/${linkData.link}`;

        card.innerHTML = `
            <div class="card-icon">
                <i class="${linkData.icon}"></i>
            </div>
            <div class="card-content">
                <h3>${linkData.label}</h3>
                <p>Category: ${linkData.category}</p>
                <a href="${fullLink}" target="_blank">Visit Channel</a>
            </div>
            <div class="card-actions">
                <button onclick="deleteChannel(${index})">Delete</button>
            </div>
        `;

        channelList.appendChild(card);
    });
}

function deleteChannel(index) {
    let links = JSON.parse(localStorage.getItem('links')) || [];
    links.splice(index, 1);
    localStorage.setItem('links', JSON.stringify(links));
    displayLinks();
}

// Dark Theme Toggle
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
    const currentTheme = document.body.dataset.theme;
    const newTheme = currentTheme === 'dark' ? '' : 'dark';
    document.body.dataset.theme = newTheme;
    localStorage.setItem('theme', newTheme);
});

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.dataset.theme = savedTheme;
    }
    displayLinks();
});
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
}
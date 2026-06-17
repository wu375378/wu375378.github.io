const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1fNqY7jkBBoXbw5w0EqzzdvtPHI2vMfXX1Sk4co11SJ4/gviz/tq?tqx=out:csv';
        const FORM_POST_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdBGDmLWliwRJrslJ8QW4lOtQM7_6BOYJ7V0EWUlQ-RDcP0gQ/formResponse';
        
        const TOMBSTONE_IMG = 'https://raw.githubusercontent.com/xiaoyou0710/suspension-list/refs/heads/main/file_0000000012cc722fadf5374a54f461bd.png';
        const BANNED_WORDS_FILE = 'https://github.com/xiaoyou0710/suspension-list/blob/main/banned.txt';
        const BLACKLIST_FILE = 'https://github.com/xiaoyou0710/suspension-list/blob/main/98d2d524-9735-4c1d-a2a2-66b266d88257.txt';

        let deadPeople = [];
        let bannedWords = [];
        let myUUID = "";
        let myIP = "";

        // 1. initialise identity
        async function initIdentity() {
            // processing uuid
            let uuid = localStorage.getItem('meta_funeral_uuid');
            if (!uuid) {
                uuid = 'ID-' + Math.random().toString(36).substr(2, 9).toUpperCase() + '-' + Date.now();
                localStorage.setItem('meta_funeral_uuid', uuid);
            }
            myUUID = uuid;

            // processing ip
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                myIP = data.ip;
            } catch (e) {
                myIP = "UNKNOWN";
            }
        }

        // 2. check blocked uuid and ip
        async function checkBlacklist() {
            try {
                const response = await fetch(BLACKLIST_FILE + '?t=' + Date.now());
                if (response.ok) {
                    const text = await response.text();
                    const list = text.split('\n').map(item => item.trim()).filter(item => item);
                    
                    if (list.includes(myUUID) || list.includes(myIP)) {
                        document.getElementById('main-content').style.display = 'none';
                        document.getElementById('blocked-screen').style.display = 'flex';
                        return true;
                    }
                }
            } catch (e) {}
            return false;
        }

        window.onload = async () => {
            await initIdentity();
            const blocked = await checkBlacklist();
            if (blocked) return;

            await fetchBannedWords();
            await fetchGraves();
        };

        async function fetchBannedWords() {
            try {
                const response = await fetch(BANNED_WORDS_FILE);
                if (response.ok) {
                    const text = await response.text();
                    bannedWords = text.split('\n').map(w => w.trim()).filter(w => w);
                }
            } catch (e) {}
        }

        async function fetchGraves() {
            try {
                const response = await fetch(SHEET_CSV_URL);
                const text = await response.text();
                deadPeople = parseCSV(text);
                renderGraveyard(deadPeople);
            } catch (e) {
                document.getElementById('loading').innerText = 'Error obtaining data. Please refresh the page.';
            }
        }

        function parseCSV(csvText) {
            const lines = csvText.split('\n');
            const result = [];
            for (let i = 1; i < lines.length; i++) {
                if (!lines[i].trim()) continue;
                const row = lines[i].match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
                const cleanData = row.map(val => val.replace(/^"|"$/g, '').replace(/""/g, '"'));
                result.push({
                    name: cleanData[1] || 'no name',
                    id: cleanData[2] || 'unknown id',
                    date: cleanData[3] || 'unknown date'
                });
            }
            return result.reverse(); 
        }

        function renderGraveyard(data) {
            const container = document.getElementById('graveyard');
            document.getElementById('loading').style.display = 'none';
            container.innerHTML = '';
            data.forEach(person => {
                const grave = document.createElement('div');
                grave.className = 'tombstone-wrapper';
                grave.innerHTML = `
                    <img src="${TOMBSTONE_IMG}" alt="tombstone">
                    <div class="tombstone-text">
                        <div class="name">${escapeHTML(person.name)}</div>
                        <div class="id">${escapeHTML(person.id)}</div>
                        <div class="date">${escapeHTML(person.date)}</div>
                    </div>
                `;
                container.appendChild(grave);
            });
        }

    function filterGraves() {
        document.getElementById('notfound').style.display = "none";
    const keyword = document.getElementById('searchInput').value.toLowerCase();
    const filtered = deadPeople.filter(p => 
        p.name.toLowerCase().includes(keyword) || p.id.toLowerCase().includes(keyword)
    );
    
    if (filtered.length === 0) {
        // Option A: Display the message right inside the graveyard container
        const container = document.getElementById('graveyard-container');
        if (container) {
            document.getElementById('notfound').style.display = "flex";
        }
    } else {
        // If there are results, render them normally
            document.getElementById('notfound').style.display = "none";
        renderGraveyard(filtered);
    }
}

        function toggleRegisterForm() {
            const form = document.getElementById('register-form');
            form.style.display = (form.style.display === 'block') ? 'none' : 'block';
        }

        async function submitForm(e) {
            e.preventDefault();
            const name = document.getElementById('entryName').value;
            const id = document.getElementById('entryID').value;
            const date = document.getElementById('entryDate').value;
            const btn = document.getElementById('submitBtn');
            
            const fullContent = (name + id).toLowerCase();
            const hasBannedWord = bannedWords.some(word => fullContent.includes(word.toLowerCase()));

            btn.innerText = 'Please wait';
            btn.disabled = true;

            // spoof if banned keywords detected
            if (hasBannedWord) {
                setTimeout(() => {
                    alert('Sorry, something didn\'t work here. Please try again.');
                    location.reload();
                }, 1000);
                return;
            }

            // send data to the server
            const formData = new URLSearchParams();
            formData.append('entry.510043352', name);
            formData.append('entry.1259375546', id);
            formData.append('entry.1128410849', date);
            formData.append('entry.1443440662', myUUID);
            formData.append('entry.766832530', myIP);

            try {
                await fetch(FORM_POST_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData
                });
                alert('The operation completed successfully.');
                location.reload(); 
            } catch (error) {
                alert('Server side encountered an unhandled error. Please try again later.');
                btn.disabled = false;
                btn.innerText = 'Confirm submit';
            }
        }

        function escapeHTML(str) {
            return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
        }

const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1nXLLXNyaWUA0Xz7wjhltcDuQPAJaVNJbXQjEZ6bmTrg/gviz/tq?tqx=out:csv';
        const FORM_POST_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSccYROYAPL1BRxGwsrLFc1qWH3KAhKIN2_orCjSZT210xa0pQ/formResponse';
        const BANNED_WORDS_FILE = 'not-allowed-keywords.txt';
        const BLACKLIST_FILE = 'suspended-device-list.txt';

        let deadPeople = [];
        let bannedWords = [];
        let myUUID = "";
        let myIP = "";

        // document.getElementById('notfound').style.display = "none";

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
                            setTimeout(() => {
                                window.location.href = '../403.html';
                            }, 1000);
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
                document.getElementById('victim-count').innerText = deadPeople.length;
                renderGraveyard(deadPeople);
            } catch (e) {
                document.getElementById('loading').innerText = 'Error loading data. Please refresh page.';
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
                    plat: cleanData[4] || 'unknown platform',
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
                    <div class="tombstone-text">
                        <div class="name">${escapeHTML(person.name)}</div>
                        <div class="id">${escapeHTML(person.id)}</div>
                        <div class="platform">${escapeHTML(person.plat)}</div>
                        <div class="date">${escapeHTML(person.date)}</div>
                    </div>
                `;
                container.appendChild(grave);
            });
        }

        function filterGraves() {
            const keyword = document.getElementById('searchInput').value.toLowerCase();
            const filtered = deadPeople.filter(p => 
                (p.name && p.name.toLowerCase().includes(keyword)) || 
                (p.id && p.id.toLowerCase().includes(keyword))
            );
            // no delay required
            const container = document.getElementById('graveyard');
            container.innerHTML = '';
            filtered.forEach(person => {
                const grave = document.createElement('div');
                grave.className = 'tombstone-wrapper show'; // show directly
                grave.innerHTML = `
                    <div class="tombstone-text">
                        <div class="name">${escapeHTML(person.name || '無名氏')}</div>
                        <div class="id">${escapeHTML(person.id || '未知')}</div>
                        <div class="plat">${escapeHTML(person.plat) || 'unknown platform'}</div>
                        <div class="date">${escapeHTML(person.date || '日期不詳')}</div>
                    </div>
                `;
                container.appendChild(grave);
            });
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
            const plat = document.getElementById('entryPlat').value;
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
            formData.append('entry.1351756525', name);
            formData.append('entry.271752185', id);
            formData.append('entry.1029603241', plat);
            formData.append('entry.512815938', date);
            formData.append('entry.1030014164', myUUID);
            formData.append('entry.1778117062', myIP);

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
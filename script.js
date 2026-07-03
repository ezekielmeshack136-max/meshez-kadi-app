const supabaseUrl = 'https://fymjjqembyrlwgktbcgf.supabase.co'; 
const supabaseKey = 'sb_publishable_SMflxbKh4452586Q4ojrow_L4ZGq2uu';
const client = supabase.createClient(supabaseUrl, supabaseKey);

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
}

async function loadEvents() {
    const { data } = await client.from('events').select('*');
    const grid = document.getElementById('eventsGrid');
    if(data && grid) {
        grid.innerHTML = data.map(e => `
            <div class="event-card">
                <div class="event-card-header">
                    <div class="event-card-title">${e.name}</div>
                </div>
                <div class="event-card-body"><p>${e.venue}</p></div>
            </div>
        `).join('');
    }
}

async function loadTemplates() {
    const { data } = await client.from('templates').select('*');
    const list = document.getElementById('templatesList');
    if(data && list) {
        list.innerHTML = data.map(t => `
            <div class="template-item">
                <img src="${t.image_url}" width="100">
                <p>${t.name}</p>
            </div>
        `).join('');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadEvents();
    loadTemplates();
});
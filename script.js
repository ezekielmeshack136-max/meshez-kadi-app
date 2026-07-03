const supabaseUrl = 'https://fymjjqembyrlwgktbcgf.supabase.co';
const supabaseKey = 'sb_publishable_SMflxbKh4452586Q4ojrow_L4ZGq2uu';
const client = window.supabase.createClient(supabaseUrl, supabaseKey);

// --- AUTH LOGIC ---
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await client.auth.signUp({ email, password });
    alert("Thibitisha barua pepe yako.");
}

async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await client.auth.signInWithPassword({ email, password });
}

// --- DASHBOARD LOGIC ---
client.auth.onAuthStateChange((event, session) => {
    if (session) {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('dashboard-container').style.display = 'flex';
    } else {
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('dashboard-container').style.display = 'none';
    }
});

function loadSection(section) {
    const container = document.getElementById('data-container');
    container.innerHTML = `<h2>${section.toUpperCase()}</h2><p>Hapa ndipo tutaweka fomu za ${section}.</p>`;
}
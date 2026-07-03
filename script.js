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
// Ku-Sign Up (Jisajili)
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { data, error } = await client.auth.signUp({ email, password });
    if (error) alert("Kosa: " + error.message);
    else alert("Hongera! Angalia barua pepe yako ili kuthibitisha.");
}

// Ku-Sign In (Ingia)
async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { data, error } = await client.auth.signInWithPassword({ email, password });
    if (error) alert("Kosa: " + error.message);
    else window.location.reload(); // Refresh ili kuonyesha Dashboard
}

// Angalia kama mtu yupo ndani
client.auth.onAuthStateChange((event, session) => {
    if (session) {
        // Mtu yupo ndani, onyesha Dashboard
        document.getElementById('auth-container').style.display = 'none';
        showDashboard(); 
    } else {
        // Mtu hajajisajili, onyesha Login pekee
        document.getElementById('auth-container').style.display = 'block';
    }
});

// Function ya ku-handle state
client.auth.onAuthStateChange((event, session) => {
    const authDiv = document.getElementById('auth-container');
    const dashDiv = document.getElementById('dashboard-container');
    
    if (session) {
        authDiv.style.display = 'none'; // Ficha login
        dashDiv.style.display = 'flex'; // Onyesha dashboard
    } else {
        authDiv.style.display = 'block'; // Onyesha login
        dashDiv.style.display = 'none'; // Ficha dashboard
    }
});

function loadSection(section) {
    const container = document.getElementById('data-container');
    container.innerHTML = `<h2>${section.toUpperCase()}</h2><p>Hapa ndipo tutaweka fomu za ${section}.</p>`;
}
// Function hii ndiyo inayosababisha kosa
function showSection(section) {
    console.log("Section inayotakiwa kuonyeshwa:", section);
    const container = document.getElementById('data-container');
    
    // Hapa tunaweka kitu ili uone kama inafanya kazi
    container.innerHTML = `<h2>Unatazama sehemu ya: ${section}</h2>`;
}
function showSection(section) {
    const container = document.getElementById('data-container');
    if (section === 'invitations') {
        container.innerHTML = `
            <h2>Send Invitations</h2>
            <select id="eventSelect"><option>Chagua Tukio</option></select>
            <select id="methodSelect"><option value="whatsapp">WhatsApp</option><option value="sms">SMS</option></select>
            <button onclick="sendInvites()">Tuma Mialiko</button>
        `;
    }
    // Hapa utaongeza logiki za sections nyingine...
}

async function sendInvites() {
    const method = document.getElementById('methodSelect').value;
    alert("Inatuma kupitia " + method + "... (Hapa unganisha na API Gateway)");
    // Logic: Vuta guests.phone kutoka supabase kulingana na event_id
    // Tuma kupitia API ya WhatsApp (mfano: WizApi) au SMS
}
async function sendInvitation(eventId, method) {
    // 1. Vuta namba za wageni
    const { data: guests } = await client.from('guests').select('phone, full_name').eq('event_id', eventId);

    // 2. Loop kila mgeni na tuma ujumbe
    for (const guest of guests) {
        const message = `Habari ${guest.full_name}, karibu kwenye tukio letu!`;
        
        if (method === 'whatsapp') {
            // Hapa utaita API ya WhatsApp (mfano: WizApi au Twilio)
            await callWhatsAppAPI(guest.phone, message);
        } else {
            // Hapa utaita API ya SMS (mfano: Africa's Talking)
            await callSMSAPI(guest.phone, message);
        }
    }
}
async function saveEvent() {
    // Tunachukua value zote kutoka kwenye input fields
    const title = document.getElementById('eventTitle').value;
    const description = document.getElementById('eventDescription').value; // Mpya
    const venue = document.getElementById('eventVenue').value;
    const event_date = document.getElementById('eventDate').value;
    const status = 'active'; // Status ya kuanzia

    // Tunatuma data zote kwenye table ya 'events'
    const { error } = await client.from('events').insert([{ 
        title, 
        description, 
        venue, 
        event_date, 
        status 
    }]);
    
    if (error) {
        alert("Kosa: " + error.message);
    } else {
        alert("Tukio limehifadhiwa kikamilifu!");
        loadEvents(); // Reload list ya matukio
    }
}
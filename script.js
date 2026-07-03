// 1. Sanidi muunganisho wa Supabase
const supabaseUrl = 'https://fymjjqembyrlwgktbcgf.supabase.co';
const supabaseKey = 'sb_publishable_SMflxbKh4452586Q4ojrow_L4ZGq2uu';
const client = window.supabase.createClient(supabaseUrl, supabaseKey);

async function loadDashboard() {
    try {
        console.log("Inapakia taarifa za tukio na wageni...");

        // 2. Vuta taarifa za Tukio (Event)
        // Tunatumia .select('*') ili kuvuta columns zote ulizotaja
        const { data: eventData, error: eventError } = await client
            .from('events')
            .select('*')
            .limit(1)
            .single();

        if (eventError) throw eventError;

        // 3. Vuta orodha ya wageni wanaohusika na tukio hilo
        const { data: guestsData, error: guestsError } = await client
            .from('guests')
            .select('full_name')
            .eq('event_id', eventData.id); // Tunachuja wageni kulingana na tukio

        if (guestsError) throw guestsError;

        // 4. Jenga muonekano (Dashboard UI)
        let html = `
            <div class="event-card">
                <h2>${eventData.title}</h2>
                <p><strong>Maelezo:</strong> ${eventData.description}</p>
                <p><strong>Tarehe:</strong> ${eventData.event_date}</p>
                <p><strong>Ukumbi:</strong> ${eventData.venue}</p>
                <p><strong>Hali (Status):</strong> ${eventData.status}</p>
                <small>Iliundwa: ${new Date(eventData.created_at).toLocaleDateString()}</small>
            </div>
            <hr>
            <h4>Orodha ya Wageni (${guestsData.length}):</h4>
            <ul>
                ${guestsData.length > 0 
                    ? guestsData.map(g => `<li>${g.full_name}</li>`).join('') 
                    : "<li>Hakuna wageni waliosajiliwa.</li>"}
            </ul>
        `;
        
        document.getElementById('data-container').innerHTML = html;

    } catch (err) {
        console.error("Hitilafu:", err);
        document.getElementById('data-container').innerHTML = "Imeshindwa kupakia data: " + err.message;
    }
}

// 5. Iite function
loadDashboard();
// Tunatumia supabase kutoka kwenye library tuliyoiweka kwenye HTML
// Hakikisha hujatangaza 'const supabase' nyingine hapa.
// Tutatumia 'window.supabase' kama njia mbadala.

const supabaseUrl = 'https://fymjjqembyrlwgktbcgf.supabase.co';
const supabaseKey = 'sb_publishable_SMflxbKh4452586Q4ojrow_L4ZGq2uu';

// Tunaanzisha muunganisho kwa kutumia supabase ya global
const mySupabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function fetchGuests() {
    try {
        const { data, error } = await mySupabase.from('guests').select('*');

        if (error) {
            document.getElementById('data-container').innerHTML = "Hitilafu: " + error.message;
            return;
        }

        if (data && data.length > 0) {
            let html = "<ul>";
            data.forEach(guest => {
                html += `<li>${guest.name}</li>`;
            });
            html += "</ul>";
            document.getElementById('data-container').innerHTML = html;
        } else {
            document.getElementById('data-container').innerHTML = "Hakuna wageni waliosajiliwa.";
        }
    } catch (err) {
        document.getElementById('data-container').innerHTML = "Imeshindwa kuunganisha na database.";
    }
}

fetchGuests();
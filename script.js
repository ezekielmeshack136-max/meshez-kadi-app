// Tunatumia supabase iliyopo kwenye window global object
const url = 'https://fymjjqembyrlwgktbcgf.supabase.co';
const key = 'sb_publishable_SMflxbKh4452586Q4ojrow_L4ZGq2uu';

// Tunatumia 'client' kama jina tofauti kabisa
const client = window.supabase.createClient(url, key);

async function fetchGuests() {
    console.log("Inaanza kuleta data...");
    const { data, error } = await client.from('guests').select('*');

    if (error) {
        document.getElementById('data-container').innerHTML = "Hitilafu: " + error.message;
        return;
    }

    if (data && data.length > 0) {
        let html = "<ul>";
        data.forEach(g => { html += `<li>${g.name}</li>`; });
        html += "</ul>";
        document.getElementById('data-container').innerHTML = html;
    } else {
        document.getElementById('data-container').innerHTML = "Hakuna wageni.";
    }
}

fetchGuests();
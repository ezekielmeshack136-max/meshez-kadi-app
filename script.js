// Tunatumia supabase iliyokuja kupitia CDN kwenye index.html
const supabaseUrl = 'WEKA_URL_YAKO_HAPA';
const supabaseKey = 'WEKA_ANON_KEY_YAKO_HAPA';

// Hapa tunahakikisha supabase inatambulika vizuri
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

async function fetchGuests() {
    console.log("Inajaribu kuunganisha...");
    const { data, error } = await supabase.from('guests').select('*');

    if (error) {
        console.error("Hitilafu ya Supabase:", error);
        document.getElementById('data-container').innerHTML = "Hitilafu: " + error.message;
    } else {
        console.log("Data imepatikana:", data);
        if (data.length > 0) {
            let html = "<ul>";
            data.forEach(guest => {
                html += `<li>${guest.name}</li>`;
            });
            html += "</ul>";
            document.getElementById('data-container').innerHTML = html;
        } else {
            document.getElementById('data-container').innerHTML = "Hakuna wageni kwenye database.";
        }
    }
}

fetchGuests();
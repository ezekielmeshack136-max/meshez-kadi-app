// 1. Sanidi muunganisho wa Supabase
const supabaseUrl = 'https://fymjjqembyrlwgktbcgf.supabase.co'; // Ibadilishe
const supabaseKey = 'sb_publishable_SMflxbKh4452586Q4ojrow_L4ZGq2uu'; // Ibadilishe

// Tunatumia window.supabase kutokana na library tuliyoiweka kwenye HTML
const client = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. Function ya kuvuta data kutoka kwenye table ya 'guests'
async function fetchGuests() {
    try {
        console.log("Inaanza kuleta data kutoka Supabase...");

        // Tunaita table ya 'guests' na column ya 'full_name'
        const { data, error } = await client
            .from('guests')
            .select('full_name'); 

        if (error) {
            console.error("Hitilafu ya Supabase:", error);
            document.getElementById('data-container').innerHTML = "Hitilafu: " + error.message;
            return;
        }

        // 3. Onyesha data kwenye ukurasa
        if (data && data.length > 0) {
            let html = "<ul>";
            data.forEach(guest => {
                // Tunatumia 'guest.full_name' kwa sababu ndilo jina la column yako
                html += `<li>${guest.full_name || "Jina halijaandikwa"}</li>`;
            });
            html += "</ul>";
            document.getElementById('data-container').innerHTML = html;
        } else {
            document.getElementById('data-container').innerHTML = "Hakuna wageni waliosajiliwa kwenye database.";
        }
    } catch (err) {
        console.error("Kosa la mfumo:", err);
        document.getElementById('data-container').innerHTML = "Imeshindwa kuunganisha na database.";
    }
}

// 4. Tekeleza kazi hii ukurasa unapofunguka
fetchGuests();
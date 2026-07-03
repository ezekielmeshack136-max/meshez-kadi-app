// Initialize Supabase client
const supabaseUrl = 'https://fymjjqembyrlwgktbcgf.supabase.co';
const supabaseKey = 'sb_publishable_SMflxbKh4452586Q4ojrow_L4ZGq2uu';

const supabase = supabase.createClient(supabaseUrl, supabaseKey);

async function fetchGuests() {
    try {
        const { data, error } = await supabase
            .from('guests') // Hakikisha table yako Supabase inaitwa 'guests'
            .select('*');

        if (error) {
            document.getElementById('data-container').innerHTML = "Hitilafu: " + error.message;
            return;
        }

        // Onyesha data kwenye ukurasa
        if (data && data.length > 0) {
            let html = "<ul>";
            data.forEach(guest => {
                html += `<li>${guest.name}</li>`; // Hakikisha una column inaitwa 'name'
            });
            html += "</ul>";
            document.getElementById('data-container').innerHTML = html;
        } else {
            document.getElementById('data-container').innerHTML = "Hakuna wageni waliopatikana.";
        }
    } catch (err) {
        document.getElementById('data-container').innerHTML = "Imeshindwa kuunganisha na database.";
    }
}

// Iite function hii ukurasa ukimaliza kupakia
fetchGuests();
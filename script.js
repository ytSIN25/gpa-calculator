// 1. Initialize Supabase
const _supabase = supabase.createClient(
    'https://gqwnxkchkoujamfpnbhu.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxd254a2Noa291amFtZnBuYmh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMTY4ODQsImV4cCI6MjA4NTU5Mjg4NH0.itzJm-6SpvOK1KAfe-DdRr6tZMPXaklP4gepldQIsIc'
);

let saveTimeout;

// 2. Login & Logout Functions
async function login() {
    // This creates the exact link to your GitHub project folder
    const safeRedirect = window.location.origin + window.location.pathname;
    
    await _supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { 
            redirectTo: safeRedirect 
        }
    });
}

async function logout() {
    await _supabase.auth.signOut();
    window.location.reload(); // Refresh to clear all states
}

// 3. Calculation Engine
function runBrain() {
    const cards = document.querySelectorAll('.subject-card');
    let overallWeightedSum = 0;
    let subjectCount = cards.length;

    cards.forEach(card => {
        const rows = card.querySelectorAll('.assignment-row');
        let subjectTotal = 0;

        rows.forEach(row => {
            const weight = parseFloat(row.dataset.weight) || 0;
            const scoreInput = row.querySelector('.inp-score');
            const maxVal = parseFloat(row.querySelector('.static-max').textContent) || 100;
            const val = scoreInput.value === "" ? 0 : parseFloat(scoreInput.value);

            subjectTotal += (val / maxVal) * weight;
            scoreInput.style.backgroundColor = val > maxVal ? "#fee2e2" : "";
        });

        const display = card.querySelector('.subject-total');
        if (display) display.textContent = `${subjectTotal.toFixed(1)}%`;
        overallWeightedSum += subjectTotal;
    });

    const finalGrade = overallWeightedSum / subjectCount;
    const totalDisplay = document.getElementById('total-grade');
    const progressBar = document.getElementById('overall-progress');

    if (totalDisplay) totalDisplay.textContent = finalGrade.toFixed(1);
    if (progressBar) progressBar.style.width = `${Math.min(finalGrade, 100)}%`;
}

// 4. Syncing Logic
async function syncToCloud() {
    const { data: { session } } = await _supabase.auth.getSession();
    if (!session) return;

    const statusLabel = document.getElementById('status-label');
    if (statusLabel) {
        statusLabel.textContent = "Syncing...";
        statusLabel.style.color = "var(--text-dim)";
    }

    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(async () => {
        const rawScores = Array.from(document.querySelectorAll('.inp-score')).map((input, index) => ({
            id: index,
            val: input.value
        }));

        const { error } = await _supabase.from('user_scores').upsert({
            user_id: session.user.id,
            data: rawScores
        }, { onConflict: 'user_id' });

        if (statusLabel) {
            statusLabel.textContent = error ? "Error" : "Saved";
            statusLabel.style.color = error ? "#ef4444" : "#10b981";
        }
    }, 1000);
}

// 5. Load Data
async function loadExistingData(userId) {
    const { data } = await _supabase
        .from('user_scores')
        .select('data')
        .eq('user_id', userId)
        .maybeSingle();

    const inputs = document.querySelectorAll('.inp-score');

    if (data && data.data) {
        data.data.forEach((item, index) => {
            if (inputs[index]) inputs[index].value = item.val;
        });
    } else {
        inputs.forEach(input => {
            const row = input.closest('.assignment-row');
            const max = row.querySelector('.static-max').textContent;
            input.value = max;
        });
    }
    runBrain();
}

// 6. Handle Auth State & UI Updates (Fixed Button Logic)
_supabase.auth.onAuthStateChange((event, session) => {
    const loginScreen = document.getElementById('login-screen');
    const mainDashboard = document.getElementById('main-dashboard');
    const userEmail = document.getElementById('user-email');
    
    // Select all potential login/logout buttons
    const authButtons = document.querySelectorAll('#login-btn, #login-gate-btn');

    if (session) {
        if (loginScreen) loginScreen.style.display = 'none';
        if (mainDashboard) mainDashboard.style.display = 'block';
        if (userEmail) userEmail.textContent = session.user.email;
        
        authButtons.forEach(btn => {
            btn.textContent = "Logout";
            btn.classList.remove('btn-primary');
            btn.classList.add('btn-outline');
            btn.onclick = logout; // Set to Logout function
        });

        loadExistingData(session.user.id);
    } else {
        if (loginScreen) loginScreen.style.display = 'flex';
        if (mainDashboard) mainDashboard.style.display = 'none';
        if (userEmail) userEmail.textContent = "";
        
        authButtons.forEach(btn => {
            btn.textContent = "Login with Google";
            btn.classList.remove('btn-outline');
            btn.classList.add('btn-primary');
            btn.onclick = login; // Set to Login function
        });
    }
});

// 7. Event Listeners
document.addEventListener('input', (e) => {
    if (e.target.classList.contains('inp-score')) {
        runBrain();
        syncToCloud();
    }
});

document.addEventListener('focusin', (e) => {
    if (e.target.classList.contains('inp-score')) e.target.select();
});

// Accordion Logic: Click to Open/Close
document.addEventListener('click', (e) => {
    const card = e.target.closest('.subject-card');
    
    // If we didn't click a card, or we clicked an input/button inside a card, don't toggle
    if (!card || e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;

    // 1. Check if this card is already open
    const isActive = card.classList.contains('is-active');

    // 2. Close ALL other cards
    document.querySelectorAll('.subject-card').forEach(c => {
        c.classList.remove('is-active');
    });

    // 3. If the clicked card wasn't open, open it now
    if (!isActive) {
        card.classList.add('is-active');
    }
});
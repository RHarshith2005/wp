<?php date_default_timezone_set('Asia/Kolkata'); ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Date, Time & Day</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif; min-height: 100vh;
            display: flex; justify-content: center; align-items: center;
            background: #0a0a1a; overflow: hidden;
        }
        /* Animated mesh gradient */
        .bg-mesh {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0;
        }
        .bg-mesh .blob {
            position: absolute; border-radius: 50%; filter: blur(100px); opacity: 0.6;
        }
        .bg-mesh .blob:nth-child(1) {
            width: 500px; height: 500px; background: #f093fb; top: -150px; right: -100px;
            animation: blobMove1 10s ease-in-out infinite alternate;
        }
        .bg-mesh .blob:nth-child(2) {
            width: 450px; height: 450px; background: #f5576c; bottom: -150px; left: -100px;
            animation: blobMove2 12s ease-in-out infinite alternate;
        }
        .bg-mesh .blob:nth-child(3) {
            width: 300px; height: 300px; background: #667eea; top: 40%; left: 30%;
            animation: blobMove3 8s ease-in-out infinite alternate;
        }
        @keyframes blobMove1 { to { transform: translate(-80px, 60px) scale(1.15); } }
        @keyframes blobMove2 { to { transform: translate(60px, -80px) scale(0.9); } }
        @keyframes blobMove3 { to { transform: translate(50px, -40px) scale(1.2); } }

        .card {
            position: relative; z-index: 1;
            background: rgba(255,255,255,0.04); backdrop-filter: blur(25px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 30px; padding: 50px 45px; text-align: center;
            max-width: 500px; width: 92%;
            animation: cardEntry 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            transform: scale(0) rotate(-5deg);
        }
        @keyframes cardEntry { to { transform: scale(1) rotate(0deg); } }
        .card h1 {
            font-size: 1.6rem; font-weight: 700; margin-bottom: 35px;
            background: linear-gradient(135deg, #f093fb, #f5576c, #ffd200);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            animation: fadeIn 0.8s 0.3s both;
        }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }

        .info-grid { display: flex; flex-direction: column; gap: 18px; }

        .info-item {
            padding: 22px 25px; border-radius: 18px;
            background: rgba(255,255,255,0.04);
            border: 1px solid rgba(255,255,255,0.06);
            display: flex; justify-content: space-between; align-items: center;
            transition: all 0.4s; cursor: default;
            animation: slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        .info-item:nth-child(1) { animation-delay: 0.4s; }
        .info-item:nth-child(2) { animation-delay: 0.6s; }
        .info-item:nth-child(3) { animation-delay: 0.8s; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }

        .info-item:hover {
            background: rgba(255,255,255,0.08);
            transform: translateX(8px);
            border-color: rgba(255,255,255,0.15);
        }
        .info-item:nth-child(1):hover { box-shadow: 0 0 25px rgba(240,147,251,0.2); }
        .info-item:nth-child(2):hover { box-shadow: 0 0 25px rgba(102,126,234,0.2); }
        .info-item:nth-child(3):hover { box-shadow: 0 0 25px rgba(67,233,123,0.2); }

        .info-left { display: flex; align-items: center; gap: 14px; }
        .info-icon {
            width: 48px; height: 48px; border-radius: 14px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.5rem;
        }
        .info-item:nth-child(1) .info-icon { background: linear-gradient(135deg, rgba(240,147,251,0.3), rgba(245,87,108,0.3)); }
        .info-item:nth-child(2) .info-icon { background: linear-gradient(135deg, rgba(102,126,234,0.3), rgba(118,75,162,0.3)); }
        .info-item:nth-child(3) .info-icon { background: linear-gradient(135deg, rgba(67,233,123,0.3), rgba(56,249,215,0.3)); }

        .info-label {
            color: rgba(255,255,255,0.4); font-size: 0.75rem;
            text-transform: uppercase; letter-spacing: 2px; font-weight: 500;
        }
        .info-value {
            color: #fff; font-size: 1.3rem; font-weight: 700;
            letter-spacing: 0.5px;
        }

        /* Live clock animation */
        .live-dot {
            display: inline-block; width: 6px; height: 6px;
            background: #43e97b; border-radius: 50%;
            margin-left: 8px; vertical-align: middle;
            animation: blink 1s infinite;
        }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.2; } }
    </style>
</head>
<body>
    <div class="bg-mesh">
        <div class="blob"></div><div class="blob"></div><div class="blob"></div>
    </div>
    <div class="card">
        <h1>📅 Current Date, Time & Day</h1>
        <div class="info-grid">
            <div class="info-item">
                <div class="info-left">
                    <div class="info-icon">📆</div>
                    <div>
                        <div class="info-label">Current Date</div>
                        <div class="info-value"><?php echo date('d M Y'); ?></div>
                    </div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-left">
                    <div class="info-icon">🕒</div>
                    <div>
                        <div class="info-label">Current Time</div>
                        <div class="info-value" id="liveClock"><?php echo date('h:i:s A'); ?><span class="live-dot"></span></div>
                    </div>
                </div>
            </div>
            <div class="info-item">
                <div class="info-left">
                    <div class="info-icon">📋</div>
                    <div>
                        <div class="info-label">Current Day</div>
                        <div class="info-value"><?php echo date('l'); ?></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script>
        // Live updating clock
        setInterval(() => {
            const now = new Date();
            let h = now.getHours(), m = now.getMinutes(), s = now.getSeconds();
            const ampm = h >= 12 ? 'PM' : 'AM';
            h = h % 12 || 12;
            const pad = n => String(n).padStart(2, '0');
            document.getElementById('liveClock').innerHTML =
                `${pad(h)}:${pad(m)}:${pad(s)} ${ampm}<span class="live-dot"></span>`;
        }, 1000);
    </script>
</body>
</html>

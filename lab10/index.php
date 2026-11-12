<?php
date_default_timezone_set('Asia/Kolkata');
session_start();

// Handle logout
if (isset($_GET['action']) && $_GET['action'] === 'logout') {
    $name = isset($_SESSION['name']) ? $_SESSION['name'] : 'User';
    $startTime = isset($_SESSION['start_time']) ? $_SESSION['start_time'] : time();
    $duration = time() - $startTime;
    $hours   = floor($duration / 3600);
    $minutes = floor(($duration % 3600) / 60);
    $seconds = $duration % 60;
    $durationStr = sprintf("%02d hrs %02d min %02d sec", $hours, $minutes, $seconds);
    session_destroy();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Goodbye!</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif;
            min-height: 100vh; display: flex; justify-content: center; align-items: center;
            background: #0f0c29; overflow: hidden;
        }
        /* Animated background particles */
        .particles { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 0; }
        .particle {
            position: absolute; border-radius: 50%;
            animation: floatUp linear infinite;
            opacity: 0;
        }
        @keyframes floatUp {
            0%   { transform: translateY(100vh) scale(0); opacity: 0; }
            20%  { opacity: 1; }
            80%  { opacity: 1; }
            100% { transform: translateY(-10vh) scale(1); opacity: 0; }
        }
        .card {
            position: relative; z-index: 1;
            background: rgba(255,255,255,0.05); backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px; padding: 50px 45px; text-align: center;
            max-width: 520px; width: 90%;
            animation: cardIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            transform: scale(0);
        }
        @keyframes cardIn {
            to { transform: scale(1); }
        }
        .wave-emoji {
            font-size: 5rem; display: inline-block;
            animation: wave 1.5s ease-in-out infinite;
        }
        @keyframes wave {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(20deg); }
            50% { transform: rotate(-10deg); }
            75% { transform: rotate(15deg); }
        }
        .card h1 {
            background: linear-gradient(135deg, #f093fb, #f5576c, #ffd200);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            font-size: 2rem; margin: 10px 0;
            animation: fadeUp 0.8s 0.3s both;
        }
        .card p { color: rgba(255,255,255,0.7); font-size: 1.1rem; animation: fadeUp 0.8s 0.5s both; }
        @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to   { opacity: 1; transform: translateY(0); }
        }
        .duration-box {
            margin: 25px auto; padding: 18px 25px; border-radius: 16px;
            background: linear-gradient(135deg, rgba(102,126,234,0.3), rgba(118,75,162,0.3));
            border: 1px solid rgba(255,255,255,0.15);
            animation: fadeUp 0.8s 0.7s both, glow 2s ease-in-out infinite alternate;
        }
        @keyframes glow {
            from { box-shadow: 0 0 15px rgba(102,126,234,0.3); }
            to   { box-shadow: 0 0 30px rgba(245,87,108,0.4); }
        }
        .duration-box .label { color: rgba(255,255,255,0.5); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 2px; }
        .duration-box .time { color: #fff; font-size: 1.6rem; font-weight: 700; margin-top: 5px; }
        a.btn {
            display: inline-block; margin-top: 25px; padding: 14px 40px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #fff; text-decoration: none; border-radius: 50px;
            font-size: 1rem; font-weight: 500; letter-spacing: 1px;
            transition: all 0.4s; animation: fadeUp 0.8s 0.9s both;
            position: relative; overflow: hidden;
        }
        a.btn::before {
            content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        a.btn:hover::before { left: 100%; }
        a.btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(102,126,234,0.4); }
    </style>
</head>
<body>
    <div class="particles" id="particles"></div>
    <div class="card">
        <div class="wave-emoji">👋</div>
        <h1>Goodbye, <?php echo htmlspecialchars($name); ?>!</h1>
        <p>Thank you for visiting our site.</p>
        <div class="duration-box">
            <div class="label">Session Duration</div>
            <div class="time">⏱ <?php echo $durationStr; ?></div>
        </div>
        <a href="index.php" class="btn">✨ Login Again</a>
    </div>
    <script>
        const container = document.getElementById('particles');
        const colors = ['#667eea','#764ba2','#f093fb','#f5576c','#ffd200','#43e97b'];
        for (let i = 0; i < 50; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            const size = Math.random() * 8 + 3;
            p.style.cssText = `width:${size}px;height:${size}px;left:${Math.random()*100}%;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${Math.random()*5+4}s;animation-delay:${Math.random()*5}s;`;
            container.appendChild(p);
        }
    </script>
</body>
</html>
<?php exit; }

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['name'])) {
    $_SESSION['name']       = $_POST['name'];
    $_SESSION['start_time'] = time();
}

// If logged in, show hello page
if (isset($_SESSION['name'])) {
    $name      = htmlspecialchars($_SESSION['name']);
    $startTime = date('h:i:s A', $_SESSION['start_time']);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome, <?php echo $name; ?>!</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif; min-height: 100vh;
            background: linear-gradient(-45deg, #0f0c29, #302b63, #24243e, #0f0c29);
            background-size: 400% 400%; animation: gradientShift 15s ease infinite;
        }
        @keyframes gradientShift {
            0%   { background-position: 0% 50%; }
            50%  { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .topbar {
            display: flex; justify-content: flex-end; padding: 20px 30px;
            animation: slideDown 0.6s ease-out;
        }
        @keyframes slideDown { from { transform: translateY(-100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .time-badge {
            background: rgba(255,255,255,0.08); backdrop-filter: blur(15px);
            border: 1px solid rgba(255,255,255,0.15);
            padding: 12px 24px; border-radius: 50px; color: #fff;
            font-weight: 500; font-size: 0.95rem;
            display: flex; align-items: center; gap: 8px;
            animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse {
            0%, 100% { box-shadow: 0 0 15px rgba(67,233,123,0.2); }
            50%      { box-shadow: 0 0 25px rgba(67,233,123,0.5); }
        }
        .time-badge .dot { width: 8px; height: 8px; background: #43e97b; border-radius: 50%; animation: blink 1s infinite; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .container { display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 80px); }
        .card {
            background: rgba(255,255,255,0.05); backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px; padding: 55px 50px; text-align: center;
            max-width: 520px; width: 90%;
            animation: cardPop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            transform: scale(0);
        }
        @keyframes cardPop { to { transform: scale(1); } }
        .avatar {
            width: 100px; height: 100px; border-radius: 50%;
            background: linear-gradient(135deg, #43e97b, #38f9d7);
            display: flex; align-items: center; justify-content: center;
            font-size: 2.5rem; margin: 0 auto 20px;
            animation: bounce 2s ease infinite;
            box-shadow: 0 10px 30px rgba(67,233,123,0.3);
        }
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        .card h1 { color: #fff; font-size: 2.2rem; margin-bottom: 8px; animation: fadeUp 0.8s 0.3s both; }
        .card h1 span {
            background: linear-gradient(135deg, #43e97b, #38f9d7);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .card p { color: rgba(255,255,255,0.6); font-size: 1.05rem; animation: fadeUp 0.8s 0.5s both; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .session-info {
            margin: 25px 0; padding: 15px; border-radius: 12px;
            background: rgba(67,233,123,0.1); border: 1px solid rgba(67,233,123,0.2);
            color: rgba(255,255,255,0.8); font-size: 0.95rem;
            animation: fadeUp 0.8s 0.7s both;
        }
        a.logout-btn {
            display: inline-block; margin-top: 20px; padding: 16px 45px;
            background: linear-gradient(135deg, #f5576c, #ff6b6b);
            color: #fff; text-decoration: none; border-radius: 50px;
            font-size: 1rem; font-weight: 600; letter-spacing: 1px;
            transition: all 0.4s; animation: fadeUp 0.8s 0.9s both;
            position: relative; overflow: hidden;
        }
        a.logout-btn::before {
            content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: left 0.5s;
        }
        a.logout-btn:hover::before { left: 100%; }
        a.logout-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 10px 35px rgba(245,87,108,0.5); }
    </style>
</head>
<body>
    <div class="topbar">
        <div class="time-badge">
            <div class="dot"></div>
            🕒 Started at <?php echo $startTime; ?>
        </div>
    </div>
    <div class="container">
        <div class="card">
            <div class="avatar"><?php echo strtoupper(substr($name, 0, 1)); ?></div>
            <h1>Hello, <span><?php echo $name; ?></span>! 🎉</h1>
            <p>Welcome to our web application</p>
            <div class="session-info">
                ⚡ Your session started at <strong><?php echo $startTime; ?></strong>
            </div>
            <a href="index.php?action=logout" class="logout-btn">🚪 Logout</a>
        </div>
    </div>
    <script>
        // Live clock in the badge
        setInterval(() => {
            const now = new Date();
            document.title = 'Welcome, <?php echo $name; ?>! | ' + now.toLocaleTimeString();
        }, 1000);
    </script>
</body>
</html>
<?php exit; }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif; min-height: 100vh;
            display: flex; justify-content: center; align-items: center;
            background: #0f0c29; overflow: hidden;
        }
        /* Floating orbs background */
        .orb {
            position: fixed; border-radius: 50%; filter: blur(80px); opacity: 0.5;
            animation: orbFloat 8s ease-in-out infinite alternate;
        }
        .orb:nth-child(1) { width: 400px; height: 400px; background: #667eea; top: -100px; left: -100px; }
        .orb:nth-child(2) { width: 350px; height: 350px; background: #764ba2; bottom: -100px; right: -100px; animation-delay: -3s; }
        .orb:nth-child(3) { width: 250px; height: 250px; background: #f093fb; top: 50%; left: 60%; animation-delay: -5s; }
        @keyframes orbFloat {
            to { transform: translate(60px, 40px) scale(1.1); }
        }
        .card {
            position: relative; z-index: 1;
            background: rgba(255,255,255,0.05); backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 24px; padding: 55px 45px; text-align: center;
            max-width: 440px; width: 90%;
            animation: slideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes slideUp { from { opacity: 0; transform: translateY(60px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
        .lock-icon {
            font-size: 3.5rem; margin-bottom: 15px;
            animation: wiggle 3s ease-in-out infinite;
        }
        @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            15% { transform: rotate(-8deg); }
            30% { transform: rotate(8deg); }
            45% { transform: rotate(0deg); }
        }
        .card h1 {
            background: linear-gradient(135deg, #667eea, #764ba2, #f093fb);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            font-size: 2rem; margin-bottom: 8px;
        }
        .card .subtitle { color: rgba(255,255,255,0.5); font-size: 0.9rem; margin-bottom: 30px; }
        .input-group { position: relative; margin-bottom: 25px; }
        .input-group input {
            width: 100%; padding: 16px 20px 16px 50px;
            background: rgba(255,255,255,0.06); border: 2px solid rgba(255,255,255,0.1);
            border-radius: 14px; font-size: 1rem; color: #fff; outline: none;
            font-family: 'Poppins', sans-serif;
            transition: all 0.4s;
        }
        .input-group input::placeholder { color: rgba(255,255,255,0.3); }
        .input-group input:focus { border-color: #667eea; background: rgba(102,126,234,0.1); box-shadow: 0 0 20px rgba(102,126,234,0.2); }
        .input-group .icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); font-size: 1.2rem; }
        .card button {
            width: 100%; padding: 16px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            color: #fff; border: none; border-radius: 14px;
            font-size: 1.1rem; font-weight: 600; cursor: pointer;
            font-family: 'Poppins', sans-serif;
            transition: all 0.4s; letter-spacing: 1px;
            position: relative; overflow: hidden;
        }
        .card button::before {
            content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
            transition: left 0.6s;
        }
        .card button:hover::before { left: 100%; }
        .card button:hover { transform: translateY(-2px); box-shadow: 0 10px 35px rgba(102,126,234,0.4); }
        .card button:active { transform: translateY(0) scale(0.98); }
    </style>
</head>
<body>
    <div class="orb"></div><div class="orb"></div><div class="orb"></div>
    <div class="card">
        <div class="lock-icon">🔐</div>
        <h1>Welcome Back</h1>
        <p class="subtitle">Enter your name to continue</p>
        <form method="POST" action="index.php">
            <div class="input-group">
                <span class="icon">👤</span>
                <input type="text" name="name" placeholder="Your name..." required autocomplete="off">
            </div>
            <button type="submit">🚀 Let's Go</button>
        </form>
    </div>
</body>
</html>

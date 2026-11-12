<?php
$name = isset($_POST['name']) ? htmlspecialchars($_POST['name']) : 'User';
$age  = isset($_POST['age'])  ? (int)$_POST['age'] : 0;
$ok   = ($age >= 18);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title><?php echo $ok ? 'Welcome!' : 'Access Denied'; ?></title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700;900&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Poppins', sans-serif; min-height: 100vh;
            display: flex; justify-content: center; align-items: center;
            background: #080820; overflow: hidden;
        }
        .bg-glow {
            position: fixed; width: 500px; height: 500px; border-radius: 50%;
            filter: blur(120px); opacity: 0.4;
            top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: <?php echo $ok ? '#43e97b' : '#f5576c'; ?>;
            animation: breathe 4s ease-in-out infinite;
        }
        @keyframes breathe {
            0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
            50%      { transform: translate(-50%, -50%) scale(1.2); opacity: 0.5; }
        }
        .card {
            position: relative; z-index: 1;
            background: rgba(255,255,255,0.04); backdrop-filter: blur(25px);
            border: 1px solid rgba(255,255,255,0.08);
            border-radius: 28px; padding: 55px 45px; text-align: center;
            max-width: 520px; width: 92%;
            animation: popIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        @keyframes popIn { from { opacity: 0; transform: scale(0.5) rotate(-3deg); } }
        .result-icon {
            font-size: 5rem; margin-bottom: 15px;
            animation: <?php echo $ok ? 'successBounce' : 'shake'; ?> <?php echo $ok ? '2s ease infinite' : '0.6s ease'; ?>;
        }
        @keyframes successBounce {
            0%, 100% { transform: translateY(0) scale(1); }
            50%      { transform: translateY(-15px) scale(1.1); }
        }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            20%  { transform: translateX(-15px) rotate(-3deg); }
            40%  { transform: translateX(15px) rotate(3deg); }
            60%  { transform: translateX(-10px) rotate(-2deg); }
            80%  { transform: translateX(10px) rotate(2deg); }
        }
        .card h1 {
            font-size: 2rem; margin-bottom: 10px;
            background: linear-gradient(135deg, <?php echo $ok ? '#43e97b, #38f9d7' : '#f5576c, #ff6b6b'; ?>);
            -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            animation: fadeUp 0.6s 0.3s both;
        }
        .card p {
            color: rgba(255,255,255,0.6); font-size: 1.1rem; line-height: 1.7;
            animation: fadeUp 0.6s 0.5s both;
        }
        .card p strong { color: #fff; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .name-badge {
            display: inline-block; margin: 20px 0; padding: 10px 25px;
            border-radius: 50px; font-weight: 600; font-size: 1rem;
            animation: fadeUp 0.6s 0.7s both;
            background: <?php echo $ok ? 'rgba(67,233,123,0.15)' : 'rgba(245,87,108,0.15)'; ?>;
            border: 1px solid <?php echo $ok ? 'rgba(67,233,123,0.3)' : 'rgba(245,87,108,0.3)'; ?>;
            color: <?php echo $ok ? '#43e97b' : '#f5576c'; ?>;
        }
        a.btn {
            display: inline-block; margin-top: 25px; padding: 14px 40px;
            background: linear-gradient(135deg, #4facfe, #00f2fe);
            color: #0a0a2e; text-decoration: none; border-radius: 50px;
            font-size: 1rem; font-weight: 700; letter-spacing: 1px;
            transition: all 0.4s; animation: fadeUp 0.6s 0.9s both;
            position: relative; overflow: hidden;
        }
        a.btn::before {
            content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }
        a.btn:hover::before { left: 100%; }
        a.btn:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(79,172,254,0.4); }

        /* Confetti for success */
        <?php if ($ok): ?>
        .confetti { position: fixed; top: -10px; z-index: 0; animation: confettiFall linear forwards; opacity: 0; }
        @keyframes confettiFall {
            0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(105vh) rotate(720deg); opacity: 0; }
        }
        <?php endif; ?>
    </style>
</head>
<body>
    <div class="bg-glow"></div>
    <div class="card">
        <div class="result-icon"><?php echo $ok ? '✅' : '🚫'; ?></div>
        <h1><?php echo $ok ? 'Welcome to this site!' : 'Access Denied'; ?></h1>
        <div class="name-badge">👤 <?php echo $name; ?> · Age <?php echo $age; ?></div>
        <p>
        <?php if ($ok): ?>
            You are authorized to access this site.<br>
            Enjoy your stay! 🎊
        <?php else: ?>
            Hello <strong><?php echo $name; ?></strong>, you are not authorized to visit this site.<br>
            You must be at least <strong>18 years old</strong>.
        <?php endif; ?>
        </p>
        <a href="index.html" class="btn">⬅ Go Back</a>
    </div>
    <?php if ($ok): ?>
    <script>
        const colors = ['#43e97b','#38f9d7','#4facfe','#ffd200','#f093fb','#ff6b6b'];
        for (let i = 0; i < 60; i++) {
            const c = document.createElement('div');
            c.className = 'confetti';
            const size = Math.random() * 10 + 5;
            c.style.cssText = `left:${Math.random()*100}%;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>0.5?'50%':'2px'};animation-duration:${Math.random()*2+2}s;animation-delay:${Math.random()*2}s;`;
            document.body.appendChild(c);
        }
    </script>
    <?php endif; ?>
</body>
</html>

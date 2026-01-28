import React, { useState, useEffect } from 'react';

export default function ValentineLanding() {
  const [noClickCount, setNoClickCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);

  const sadStages = [
    {
      title: "Will You Be My Valentine? 🥺",
      gif: "https://github.com/NikhilMarko03/resources/blob/main/happy1.gif?raw=true",
      message: ""
    },
    {
      title: "Am sad now",
      gif: "https://media4.giphy.com/media/v1.Y2lkPTZjMDliOTUyb2QyaGJyaGU1Y3duaDNnbHk5aDRjcnJ2NHIyMWtkdnh2aWdqYXl0diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/P53TSsopKicrm/200.gif",
      message: "💔"
    },
    {
      title: "Please say yes",
      gif: "https://media1.tenor.com/images/9413ffc5a11722a3cc456a88810750bd/tenor.gif?itemid=14193216",
      message: "🥺"
    },
    {
      title: "Now I'm crying",
      gif: "https://media3.giphy.com/media/OPU6wzx8JrHna/giphy.gif",
      message: "😢"
    }
  ];

  const currentStage = sadStages[noClickCount];

  useEffect(() => {
    createFloatingHearts();
  }, []);

  const createFloatingHearts = () => {
    const container = document.querySelector('.hearts-container');
    if (!container) return;

    for (let i = 0; i < 15; i++) {
      const heart = document.createElement('div');
      heart.className = 'floating-heart';
      heart.textContent = '❤️';
      heart.style.left = `${Math.random() * 100}%`;
      heart.style.animationDelay = `${Math.random() * 5}s`;
      heart.style.fontSize = `${Math.random() * 20 + 20}px`;
      container.appendChild(heart);
    }
  };

  const handleNoClick = () => {
    if (noClickCount < sadStages.length - 1) {
      setNoClickCount(noClickCount + 1);
    }
  };

  const handleYesClick = () => {
    setYesPressed(true);
  };

  const [showMessage, setShowMessage] = useState(false);
  const [explosions, setExplosions] = useState<Array<{
    id: number;
    x: number;
    y: number;
    tx: number;
    ty: number;
    emoji: string;
  }>>([]);
  const [floatingHearts, setFloatingHearts] = useState<Array<{
    id: number;
    emoji: string;
    left: string;
    delay: string;
    size: string;
  }>>([]);

  useEffect(() => {
    // Create floating hearts background
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    const newFloatingHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      emoji: hearts[Math.floor(Math.random() * hearts.length)],
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      size: `${Math.random() * 20 + 15}px`
    }));
    setFloatingHearts(newFloatingHearts);
  }, []);

  const createHeartExplosion = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘'];
    const newExplosions: Array<{
      id: number;
      x: number;
      y: number;
      tx: number;
      ty: number;
      emoji: string;
    }> = [];

    for (let i = 0; i < 15; i++) {
      const angle = (Math.PI * 2 * i) / 15;
      const distance = 100 + Math.random() * 100;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      newExplosions.push({
        id: Date.now() + i,
        x,
        y,
        tx,
        ty,
        emoji: hearts[Math.floor(Math.random() * hearts.length)]
      });
    }

    setExplosions(prev => [...prev, ...newExplosions]);

    setTimeout(() => {
      setShowMessage(true);
    }, 300);

    setTimeout(() => {
      setExplosions(prev => prev.filter(exp => !newExplosions.includes(exp)));
    }, 1500);
  };

  if (yesPressed) {
    return (
      <>
        <style>{`
          :root {
            --rose: #FF6B9D;
            --deep-rose: #C73866;
            --cream: #FFF5F7;
            --gold: #FFD700;
            --burgundy: #8B2942;
          }
          
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Crimson+Text:ital,wght@0,400;0,600;1,400&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Crimson Text', serif;
            background: linear-gradient(135deg, #FFF5F7 0%, #FFE5EC 50%, #FFC9D9 100%);
            min-height: 100vh;
            overflow-x: hidden;
          }
          
          .valentine-container {
            position: relative;
            min-height: 100vh;
          }
          
          .hearts-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
          }
          
          .heart-float {
            position: absolute;
            opacity: 0.15;
            animation: float-up 15s infinite ease-in;
          }
          
          @keyframes float-up {
            0% {
              transform: translateY(100vh) rotate(0deg);
              opacity: 0;
            }
            10% {
              opacity: 0.15;
            }
            90% {
              opacity: 0.15;
            }
            100% {
              transform: translateY(-100px) rotate(360deg);
              opacity: 0;
            }
          }
          
          .initial-view {
            position: relative;
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 2rem;
            text-align: center;
            transition: opacity 0.6s ease, transform 0.6s ease;
          }
          
          .initial-view.hidden {
            opacity: 0;
            transform: scale(0.95);
            pointer-events: none;
          }
          
          h1 {
            font-family: 'Playfair Display', serif;
            font-size: clamp(3rem, 10vw, 7rem);
            font-weight: 900;
            color: var(--burgundy);
            margin-bottom: 1rem;
            text-shadow: 3px 3px 0px rgba(255, 107, 157, 0.3);
            animation: pulse 2s ease-in-out infinite;
          }
          
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          
          .subtitle {
            font-size: clamp(1.2rem, 3vw, 2rem);
            color: var(--deep-rose);
            font-style: italic;
            margin-bottom: 3rem;
            opacity: 0;
            animation: fadeIn 1s ease 0.5s forwards;
          }
          
          @keyframes fadeIn {
            to {
              opacity: 1;
            }
          }
          
          .click-button {
            background: linear-gradient(135deg, var(--rose) 0%, var(--deep-rose) 100%);
            color: white;
            border: none;
            padding: 1.5rem 4rem;
            font-size: 1.8rem;
            font-family: 'Playfair Display', serif;
            font-weight: 700;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 10px 30px rgba(199, 56, 102, 0.4);
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            opacity: 0;
            animation: fadeIn 1s ease 1s forwards, bounce 2s ease 2s infinite;
          }
          
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
          }
          
          .click-button::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: translate(-50%, -50%);
            transition: width 0.6s, height 0.6s;
          }
          
          .click-button:hover {
            transform: scale(1.1);
            box-shadow: 0 15px 40px rgba(199, 56, 102, 0.6);
          }
          
          .click-button:hover::before {
            width: 300px;
            height: 300px;
          }
          
          .click-button:active {
            transform: scale(0.98);
          }
          
          .message-view {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.8s ease;
          }
          
          .message-view.visible {
            opacity: 1;
            pointer-events: auto;
          }
          
          .message-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-radius: 30px;
            padding: 4rem 3rem;
            max-width: 600px;
            max-height: 80vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(139, 41, 66, 0.3);
            border: 3px solid var(--rose);
            transform: scale(0.8) rotateY(90deg);
            transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .message-card::-webkit-scrollbar {
            width: 8px;
          }
          
          .message-card::-webkit-scrollbar-track {
            background: rgba(255, 107, 157, 0.1);
            border-radius: 10px;
          }
          
          .message-card::-webkit-scrollbar-thumb {
            background: var(--rose);
            border-radius: 10px;
          }
          
          .message-card::-webkit-scrollbar-thumb:hover {
            background: var(--deep-rose);
          }
          
          .message-view.visible .message-card {
            transform: scale(1) rotateY(0deg);
          }
          
          .message-heart {
            font-size: 5rem;
            text-align: center;
            margin-bottom: 2rem;
            animation: heartbeat 1.5s ease infinite;
          }
          
          @keyframes heartbeat {
            0%, 100% {
              transform: scale(1);
            }
            10%, 30% {
              transform: scale(1.1);
            }
            20%, 40% {
              transform: scale(1);
            }
          }
          
          .message-text {
            font-size: 1.6rem;
            color: var(--burgundy);
            text-align: center;
            line-height: 1.8;
            margin-bottom: 2rem;
          }
          
          .message-text strong {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            color: var(--deep-rose);
            display: block;
            margin: 1rem 0;
          }
          
          .signature {
            text-align: right;
            font-style: italic;
            color: var(--deep-rose);
            font-size: 1.3rem;
            margin-top: 2rem;
          }
          
          .heart-explosion {
            position: fixed;
            font-size: 2rem;
            pointer-events: none;
            z-index: 30;
            animation: explode 1.5s ease-out forwards;
          }
          
          @keyframes explode {
            0% {
              transform: translate(0, 0) scale(1) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translate(var(--tx), var(--ty)) scale(0) rotate(720deg);
              opacity: 0;
            }
          }
          
          .deco-heart {
            position: absolute;
            font-size: 4rem;
            opacity: 0.1;
            z-index: 5;
          }
          
          .deco-heart:nth-child(1) {
            top: 10%;
            left: 10%;
            transform: rotate(-15deg);
          }
          
          .deco-heart:nth-child(2) {
            top: 20%;
            right: 15%;
            transform: rotate(20deg);
          }
          
          .deco-heart:nth-child(3) {
            bottom: 15%;
            left: 15%;
            transform: rotate(10deg);
          }
          
          .deco-heart:nth-child(4) {
            bottom: 10%;
            right: 10%;
            transform: rotate(-25deg);
          }
        `}</style>

        <div className="valentine-container">
          {/* Floating hearts background */}
          <div className="hearts-bg">
            {floatingHearts.map(heart => (
              <div
                key={heart.id}
                className="heart-float"
                style={{
                  left: heart.left,
                  animationDelay: heart.delay,
                  fontSize: heart.size
                }}
              >
                {heart.emoji}
              </div>
            ))}
          </div>

          {/* Decorative hearts */}
          <div className="deco-heart">💕</div>
          <div className="deco-heart">💖</div>
          <div className="deco-heart">💝</div>
          <div className="deco-heart">💗</div>

          {/* Initial view */}
          <div className={`initial-view ${showMessage ? 'hidden' : ''}`}>
            <h1>Happy Valentine's Day</h1>
            <p className="subtitle">Someone special has a message for you...</p>
            <button className="click-button" onClick={createHeartExplosion}>
              Click Me! ❤️
            </button>
          </div>

          {/* Message view */}
          <div className={`message-view ${showMessage ? 'visible' : ''}`}>
            <div className="message-card">
              <div className="message-heart">❤️</div>
              <div className="message-text">
                The day I met you I had no idea that you become everything to me not just a person but you become my favourite person and my reason.
                <br /><br />
                The beautiful part of our love is that even though we have bumped roads we still come together and love each other more. I can't promise to love you perfectly but I can promise to love you endlessly.
                <br /><br />
                <strong>Let me tell you how,</strong> in a sky crowded with stars, you remain the only moon I see. How, among billions of faces in this world, it is only your eyes I ever search for.
                <br /><br />
                Let me tell you how you are the fire I would reach for without fear of being burned, the warmth I would choose even knowing the cost but please allow me to love you aloud, to love you in ways you have never heard and perhaps never felt.
                <br /><br />
                <strong>Even if only once,</strong> let me make you happy in a way you smile and never forget about me, smile when you hear my name, to love you in a way you feel seen and understood, loved in a way you feel special every day.
              </div>
              <div className="signature">With all my love 💕</div>
            </div>
          </div>

          {/* Heart explosions */}
          {explosions.map(explosion => (
            <div
              key={explosion.id}
              className="heart-explosion"
              style={{
                left: `${explosion.x}px`,
                top: `${explosion.y}px`,
                '--tx': `${explosion.tx}px`,
                '--ty': `${explosion.ty}px`
              } as React.CSSProperties}
            >
              {explosion.emoji}
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="valentine-container">
      <div className="hearts-container"></div>

      <main className="main-content">
        <div className="card">
          <h1 className="title">
            {currentStage.title}
          </h1>
          
          <img 
            src={currentStage.gif}
            alt="Reaction gif"
            className="main-gif"
          />

          {currentStage.message && (
            <div className="sad-messages">
              <p className="sad-text">{currentStage.message}</p>
            </div>
          )}

          <div className="button-container">
            <button 
              onClick={handleYesClick}
              className="yes-button"
            >
              Yes 🥰
            </button>
            
            <button 
              onClick={handleNoClick}
              className="no-button"
            >
              No 😭
            </button>
          </div>
        </div>
      </main>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .valentine-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #8b7b8b 0%, #6b5b6b 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          padding: 2rem;
        }

        .hearts-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
        }

        .floating-heart {
          position: absolute;
          animation: float 8s ease-in-out infinite;
          opacity: 0.6;
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        .main-content {
          text-align: center;
          z-index: 10;
          max-width: 800px;
        }

        .card {
          background: white;
          border-radius: 30px;
          padding: 3rem 2rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        }

        .title {
          font-size: 2rem;
          color: #000;
          margin-bottom: 2rem;
          font-weight: bold;
        }

        .main-gif {
          max-width: 300px;
          width: 100%;
          border-radius: 15px;
          margin: 1rem 0;
        }

        .sad-messages {
          margin: 1.5rem 0;
        }

        .sad-text {
          font-size: 1.2rem;
          color: #666;
          margin: 0.5rem 0;
        }

        .button-container {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin: 2rem 0 0 0;
          flex-wrap: wrap;
        }

        .yes-button, .no-button {
          padding: 1rem 2.5rem;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          font-weight: bold;
          box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          transition: all 0.3s ease;
          font-family: 'Comic Sans MS', cursive, sans-serif;
          font-size: 1.2rem;
        }

        .yes-button {
          background: #ff69b4;
          color: white;
        }

        .yes-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
        }

        .no-button {
          background: #ff69b4;
          color: white;
        }

        .no-button:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
        }

        @media (max-width: 768px) {
          .card {
            padding: 2rem 1.5rem;
          }

          .title {
            font-size: 1.5rem;
          }

          .main-gif {
            max-width: 250px;
          }

          .button-container {
            flex-direction: row;
            gap: 1rem;
          }

          .yes-button, .no-button {
            font-size: 1rem;
            padding: 0.8rem 2rem;
          }
        }
      `}</style>
    </div>
  );
}
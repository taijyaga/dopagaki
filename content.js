function injectDopaInputForAll() {
  if (document.getElementById('dopa-container')) return;

  let targetArea = null;

  if (window.location.href.includes('/shorts/')) {
    // ショート動画の時は、画面の右側のアクションボタンエリアを狙う
    targetArea = document.querySelector('#actions.ytd-reel-player-overlay-renderer, #actions-inner, #right-metadata-container');
    if (!targetArea) {
      // 見つからない場合は、画面全体（body）の最前面に強制的に浮かせる
      targetArea = document.body;
    }
  } else {
    // 通常動画用
    targetArea = document.querySelector('#above-the-fold');
  }

  if (!targetArea) return;

  const container = document.createElement('div');
  container.id = 'dopa-container';
  
  if (window.location.href.includes('/shorts/')) {
    // ショート用：右側に浮遊させるスタイル（絶対配置で最前面へ）
    container.style.cssText = 'display: flex; flex-direction: column; gap: 6px; padding: 8px; background: rgba(17, 17, 17, 0.95); border-radius: 8px; border: 2px solid #ff0055; align-items: center; position: fixed; right: 20px; top: 20%; z-index: 99999; box-shadow: 0 0 10px rgba(255,0,85,0.5);';
  } else {
    // 通常動画用
    container.style.cssText = 'display: flex; gap: 10px; margin: 10px 0; padding: 10px; background: #111; border-radius: 8px; border: 1px solid #ff0055; align-items: center; width: fit-content;';
  }

  const label = document.createElement('span');
  label.innerText = window.location.href.includes('/shorts/') ? '⚡' : '⚡ ドパ速度:';
  label.style.cssText = 'color: #ff0055; font-weight: bold; font-size: 13px;';
  container.appendChild(label);

  const input = document.createElement('input');
  input.type = 'number';
  input.value = '1.0';  
  input.step = '0.1';  
  input.min = '0.1';   
  input.max = '16.0';  
  input.style.cssText = 'width: 50px; padding: 4px; background: #222; color: #fff; border: 1px solid #444; border-radius: 4px; text-align: center; font-weight: bold; font-size: 12px;';
  container.appendChild(input);

  const btn = document.createElement('button');
  btn.innerText = 'GO';
  btn.style.cssText = 'padding: 4px 10px; background: #ff0055; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; font-size: 11px;';
  
  btn.onclick = () => {
    const speedValue = parseFloat(input.value);
    if (!isNaN(speedValue)) {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        video.playbackRate = speedValue;
      });
    }
  };
  container.appendChild(btn);

  if (window.location.href.includes('/shorts/') && container.style.position === 'fixed') {
    document.body.appendChild(container);
  } else {
    targetArea.insertBefore(container, targetArea.firstChild);
  }
}

function checkUrlChange() {
  const container = document.getElementById('dopa-container');
  if (container) {
    const isShortsUrl = window.location.href.includes('/shorts/');
    const isShortsContainer = container.style.position === 'fixed';
    if (isShortsUrl !== isShortsContainer) {
      container.remove();
    }
  }
}

function hackAds() {
  const video = document.querySelector('video');
  const moviePlayer = document.querySelector('.html5-video-player');
  if (moviePlayer && moviePlayer.classList.contains('ad-showing')) {
    if (video) {
      video.playbackRate = 16; 
      video.muted = true;      
    }
    const skipButton = document.querySelector('.ytp-skip-ad-button, .ytp-ad-skip-button-mod');
    if (skipButton) { skipButton.click(); }
  }
}

setInterval(() => {
  checkUrlChange();
  injectDopaInputForAll();
  hackAds();
}, 1000);

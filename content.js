
console.log("YTQueue: Content script loaded.");

const observer = new MutationObserver(() => {
  const video = document.querySelector('video');
  
  if (video && !video.dataset.hasPermQueueListener) {
    attachListener(video);
  }
});

observer.observe(document.body, { childList: true, subtree: true });

function attachListener(video) {
  console.log("YtQueue: Video detected. Attaching listener.");
  
  video.dataset.hasYtQueueListener = "true";

  video.addEventListener('ended', handleVideoEnd);
}

function handleVideoEnd() {
  console.log("YtQueue: Video ended event fired.");

  const moviePlayer = document.querySelector('#movie_player');
  if (moviePlayer && moviePlayer.classList.contains('ad-showing')) {
    console.log("YtQueue: Ad ended. Ignoring.");
    return;
  }

  chrome.storage.local.get({ queue: [] }, (result) => {
    const queue = result.queue;

    if (queue.length > 0) {
      const nextVideo = queue[0];      
      const remainingQueue = queue.slice(1); // Dequeue


      chrome.storage.local.set({ queue: remainingQueue }, () => {
        window.location.href = `https://www.youtube.com/watch?v=${nextVideo.id}`;
      });
    } else {
      console.log("YtQueue: Queue is empty.");
    }
  });
}
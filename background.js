chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addToYtQueue",
    title: "Add to YtQueue",
    contexts: ["link"], 
    targetUrlPatterns: ["*://*.youtube.com/watch*"] 
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addToYtQueue") {
    const url = info.linkUrl;
    
    const videoIdMatch = url.match(/[?&]v=([^&]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (videoId) {
      fetchVideoTitleAndSave(videoId, url);
    }
  }
});

async function fetchVideoTitleAndSave(videoId, url) {
  try {
    const response = await fetch(`https://noembed.com/embed?url=${url}`);
    const data = await response.json();
    const title = data.title || "Unknown Video";

    chrome.storage.local.get({ queue: [] }, (result) => {
      const newQueue = result.queue;
      
      if (!newQueue.some(v => v.id === videoId)) {
        newQueue.push({ id: videoId, title: title });
        
        chrome.storage.local.set({ queue: newQueue }, () => {
          console.log(`Added: ${title}`);
        });
      }
    });

  } catch (error) {
    console.error("Failed to fetch title:", error);
    saveToStorage(videoId, "Video " + videoId);
  }
}
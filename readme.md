# YtQueue 📺

**YtQueue** is a Chrome Extension that brings a persistent "Add to Queue" feature to YouTube. Unlike the native YouTube queue, YtQueue saves your list to local storage, ensuring your queue survives browser restarts and crashes.


## 🚀 Features

- **Persistent Storage:** Uses `chrome.storage.local` to save videos even if you close the tab.
- **Auto-Play:** Automatically detects when a video ends and plays the next one in the queue.
- **Context Menu Integration:** Right-click any video link to "Add to YtQueue" instantly.
- **Smart Ad Detection:** Distinguishes between actual video endings and mid-roll ads.
- **Dark Mode UI:** Designed to match YouTube's native Dark Theme.

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Backend Logic:** Chrome Extension Manifest V3 (Service Workers)
- **Data Persistence:** Chrome Storage API
- **DOM Manipulation:** MutationObservers for SPA (Single Page Application) stability.

## 📦 Installation

1. Clone this repository.
2. Open Chrome and go to `chrome://extensions`.
3. Enable **Developer Mode** (top right).
4. Click **Load Unpacked** and select the project folder.
5. Go to YouTube and start building your queue!

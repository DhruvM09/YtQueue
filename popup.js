document.addEventListener('DOMContentLoaded', () => {
  loadQueue();

  document.getElementById('clear-all-btn').addEventListener('click', clearQueue);
  document.getElementById('play-next-btn').addEventListener('click', playNext);
});

function loadQueue() {
  chrome.storage.local.get({ queue: [] }, (result) => {
    const queue = result.queue;
    renderList(queue);
    updateCount(queue.length);
    toggleEmptyState(queue.length === 0);
  });
}

function renderList(queue) {
  const listElement = document.getElementById('queue-list');
  listElement.innerHTML = ''; 

  queue.forEach((video, index) => {
    const li = document.createElement('li');
    li.className = 'queue-item';
    
    li.innerHTML = `
      <div class="drag-handle">☰</div>
      <img src="https://img.youtube.com/vi/${video.id}/default.jpg" class="thumb">
      <div class="info">
        <span class="title" title="${video.title}">${video.title}</span>
        <span class="channel">ID: ${video.id}</span>
      </div>
      <button class="delete-btn" data-index="${index}">✕</button>
    `;

    li.querySelector('.delete-btn').addEventListener('click', () => {
      removeFromQueue(index);
    });

    listElement.appendChild(li);
  });
}

function removeFromQueue(indexToRemove) {
  chrome.storage.local.get({ queue: [] }, (result) => {
    const newQueue = result.queue.filter((_, index) => index !== indexToRemove);
    chrome.storage.local.set({ queue: newQueue }, () => {
      loadQueue(); 
    });
  });
}

function clearQueue() {
  chrome.storage.local.set({ queue: [] }, () => {
    loadQueue();
  });
}

function playNext() {
  chrome.storage.local.get({ queue: [] }, (result) => {
    const queue = result.queue;
    if (queue.length > 0) {
      const nextVideo = queue[0];
      const remainingQueue = queue.slice(1);
      
      chrome.storage.local.set({ queue: remainingQueue }, () => {
        chrome.tabs.create({ url: `https://www.youtube.com/watch?v=${nextVideo.id}` });
        window.close(); 
      });
    } else {
      alert("Queue is empty!");
    }
  });
}

function toggleEmptyState(isEmpty) {
  const emptyState = document.getElementById('empty-state');
  const listElement = document.getElementById('queue-list');
  
  if (isEmpty) {
    emptyState.classList.remove('hidden');
    listElement.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    listElement.classList.remove('hidden');
  }
}

function updateCount(count) {
  document.getElementById('queue-count').innerText = `(${count})`;
}
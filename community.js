document.addEventListener("DOMContentLoaded", () => {
    const sendBtn = document.getElementById("send-message-btn");
    const messageInput = document.getElementById("message-input");
    const chatContainer = document.querySelector(".chat-container");
    const channelItems = document.querySelectorAll(".channel-item");
    const channelHeader = document.getElementById("current-channel");
    // Define a key prefix for storing messages per channel.
    const storagePrefix = "communityMessages_";
    
    // Set default active channel.
    let currentChannel = "general";
    channelHeader.textContent = "# " + currentChannel;
  
    // Default messages for each channel (using messages by Alice, Bob, Charlie, and Dana).
    const defaultMessages = {
      general: [
        { username: "Weeee1726", date: "2025-02-20", time: "10:00", text: "Hey there, welcome to #general!" },
        { username: "DoraDaExplora",   date: "2025-02-20", time: "10:05", text: "Hi everyone, how's it going?" },
        { username: "StuntGooofy", date: "2025-02-20", time: "10:10", text: "Good morning all!" },
        { username: "Dandelions",  date: "2025-02-20", time: "10:15", text: "Excited to join the chat!" }
      ],
      random: [
        { username: "StuntGooofy", date: "2025-02-21", time: "11:00", text: "This is a random channel." },
        { username: "Dandelions",   date: "2025-02-21", time: "11:05", text: "I love random convos!" },
        { username: "DoraDaExplora", date: "2025-02-21", time: "11:10", text: "Anyone up for a random chat?" },
        { username: "Weeee1726",  date: "2025-02-21", time: "11:15", text: "Random thoughts coming through." }
      ],
      help: [
        { username: "Weeee1726", date: "2025-02-22", time: "12:00", text: "I need help with understanding these charts." },
        { username: "StuntGooofy",   date: "2025-02-22", time: "12:05", text: "What part are you stuck on?" },
        { username: "DoraDaExplora", date: "2025-02-22", time: "12:10", text: "Maybe I can help as well." },
      ]
    };
  
    // Helper: Save messages for a given channel to localStorage.
    function saveChannelMessages(channel, messages) {
      const storageKey = storagePrefix + channel;
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  
    // Helper: Load messages for a given channel from localStorage and group consecutive messages.
    function loadChannelMessages(channel) {
      const storageKey = storagePrefix + channel;
      let messages = JSON.parse(localStorage.getItem(storageKey));
      if (!messages) {
        messages = defaultMessages[channel] || [];
        saveChannelMessages(channel, messages);
      }
      
      // Group consecutive messages by the same user.
      let groupedMessages = [];
      let currentGroup = null;
      messages.forEach(msg => {
        if (currentGroup && currentGroup.username === msg.username) {
          // Append text to the current group.
          currentGroup.texts.push(msg.text);
        } else {
          // If there is a previous group, push it.
          if (currentGroup) {
            groupedMessages.push(currentGroup);
          }
          // Start a new group.
          currentGroup = {
            username: msg.username,
            date: msg.date,
            time: msg.time,
            texts: [msg.text]
          };
        }
      });
      if (currentGroup) {
        groupedMessages.push(currentGroup);
      }
      
      // Render the grouped messages.
      chatContainer.innerHTML = "";
      groupedMessages.forEach(group => {
        const groupElem = document.createElement("div");
        groupElem.classList.add("chat-message");
        
        // Header with username, date, and time.
        const headerElem = document.createElement("div");
        headerElem.classList.add("chat-message-header");
        headerElem.textContent = `${group.username} • ${group.date} • ${group.time}`;
        groupElem.appendChild(headerElem);
        
        // Append each message body for the group.
        group.texts.forEach(text => {
          const bodyElem = document.createElement("div");
          bodyElem.classList.add("chat-message-body");
          bodyElem.textContent = text;
          groupElem.appendChild(bodyElem);
        });
        
        chatContainer.appendChild(groupElem);
      });
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  
    // Load messages for the default channel.
    loadChannelMessages(currentChannel);
  
    // Handle channel switching.
    channelItems.forEach(item => {
      item.addEventListener("click", () => {
        channelItems.forEach(i => i.classList.remove("active"));
        item.classList.add("active");
        currentChannel = item.getAttribute("data-channel");
        channelHeader.textContent = "# " + currentChannel;
        loadChannelMessages(currentChannel);
      });
    });
  
    // Handle sending messages.
    sendBtn.addEventListener("click", () => {
      const text = messageInput.value.trim();
      if (!text) return;
  
      // Get current timestamp.
      const now = new Date();
      const date = now.toISOString().split("T")[0]; // Format: YYYY-MM-DD
      let hours = now.getHours();
      let minutes = now.getMinutes();
      if (hours < 10) hours = "0" + hours;
      if (minutes < 10) minutes = "0" + minutes;
      const time = `${hours}:${minutes}`;
  
      const username = localStorage.getItem("username") || "User";
  
      // Retrieve existing messages for the current channel.
      const storageKey = storagePrefix + currentChannel;
      let messages = JSON.parse(localStorage.getItem(storageKey)) || [];
  
      // Append the new message.
      messages.push({ username, date, time, text });
      // Maintain a maximum of 30 messages.
      if (messages.length > 30) {
        messages.shift();
      }
      saveChannelMessages(currentChannel, messages);
      
      // Reload messages (which groups consecutive messages).
      loadChannelMessages(currentChannel);
      
      // Clear the input field.
      messageInput.value = "";
    });
  
    // Allow sending message with the Enter key.
    messageInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendBtn.click();
      }
    });
  });  
import { io } from 'socket.io-client';

class SocketClient {
  constructor() {
    this.socket = null;
    this.isInitialized = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectInterval = 5000; // 5 seconds
  }

  /**
   * Initializes the Socket.IO connection
   * @param {string} token - JWT token for authentication
   */
  initialize(token) {
    if (this.isInitialized) {
      console.warn('Socket already initialized');
      return;
    }

    this.socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3000', {
      auth: { token },
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectInterval,
    });

    // Connection event handlers
    this.socket.on('connect', () => {
      console.log('Socket connected:', this.socket.id);
      this.reconnectAttempts = 0;
    });

    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('Max reconnection attempts reached');
      }
    });

    this.socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      this.reconnectAttempts++;
    });

    this.socket.on('error', (data) => {
      console.error('Socket error:', data.message);
    });

    this.isInitialized = true;
  }

  /**
   * Connects to the socket server
   */
  connect() {
    if (!this.isInitialized) {
      throw new Error('Socket not initialized. Call initialize() first.');
    }
    if (!this.socket.connected) {
      this.socket.connect();
    }
  }

  /**
   * Disconnects from the socket server
   */
  disconnect() {
    if (this.socket && this.socket.connected) {
      this.socket.disconnect();
      this.isInitialized = false;
      console.log('Socket disconnected manually');
    }
  }

  /**
   * Joins a job-specific room
   * @param {number} jobId - ID of the job
   */
  joinJobRoom(jobId) {
    if (!this.socket.connected) {
      console.warn('Socket not connected. Attempting to connect...');
      this.connect();
    }
    this.socket.emit('joinJobRoom', { jobId });
  }

  /**
   * Sends a message to a job room
   * @param {number} jobId - ID of the job
   * @param {string} content - Message content
   * @param {Array} attachments - Array of attachment objects
   */
  sendMessage(jobId, content, attachments = []) {
    this.socket.emit('sendMessage', { jobId, content, attachments });
  }

  /**
   * Emits typing status
   * @param {number} jobId - ID of the job
   * @param {boolean} isTyping - Whether the user is typing
   */
  emitTyping(jobId, isTyping) {
    this.socket.emit('typing', { jobId, isTyping });
  }

  /**
   * Registers an event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  on(event, callback) {
    this.socket.on(event, callback);
  }

  /**
   * Removes an event listener
   * @param {string} event - Event name
   * @param {Function} callback - Callback function
   */
  off(event, callback) {
    this.socket.off(event, callback);
  }
}

const socketClient = new SocketClient();
export default socketClient;
export interface ChatMessage {
  id: string
  sender: 'user' | 'agent'
  message: string
  timestamp: string
  isTyping?: boolean
}

export interface ChatSession {
  id: string
  userId: string
  agentId?: string
  messages: ChatMessage[]
  status: 'waiting' | 'connected' | 'ended'
  createdAt: string
  updatedAt: string
}
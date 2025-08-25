'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useChatStore } from '@/store/useChatStore'
import { Button } from '@/components/ui/Button'
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2,
  MoreVertical,
  Paperclip
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ChatWidget() {
  const { 
    isOpen, 
    messages, 
    isTyping,
    toggleChat, 
    sendMessage,
    endSession 
  } = useChatStore()
  
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSend = () => {
    if (inputMessage.trim()) {
      sendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={toggleChat}
            className="fixed bottom-6 right-6 z-40 bg-primary text-primary-foreground rounded-full p-4 shadow-lg hover:bg-primary/90 transition-colors"
          >
            <MessageCircle className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-background border rounded-lg shadow-xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-green-400 rounded-full" />
                </div>
                <div>
                  <p className="font-semibold">K-Shop 고객센터</p>
                  <p className="text-xs opacity-90">온라인 상담</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleChat}
                  className="p-1 hover:bg-primary/80 rounded transition-colors"
                >
                  <Minimize2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => {
                    endSession()
                    toggleChat()
                  }}
                  className="p-1 hover:bg-primary/80 rounded transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex",
                    msg.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg px-4 py-2",
                      msg.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    )}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(msg.timestamp).toLocaleTimeString('ko-KR', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="h-2 w-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-2 border-t">
              <div className="flex gap-2 overflow-x-auto">
                {['주문 조회', '배송 문의', '교환/환불', '상품 문의'].map((action) => (
                  <button
                    key={action}
                    onClick={() => sendMessage(action)}
                    className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full whitespace-nowrap transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-accent rounded-md transition-colors">
                  <Paperclip className="h-4 w-4 text-muted-foreground" />
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="메시지를 입력하세요..."
                  className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                />
                <Button
                  size="sm"
                  onClick={handleSend}
                  disabled={!inputMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                평일 09:00-18:00 실시간 상담
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
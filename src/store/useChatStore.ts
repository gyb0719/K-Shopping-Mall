import { create } from 'zustand'
import { ChatMessage, ChatSession } from '@/types/chat'

interface ChatStore {
  isOpen: boolean
  session: ChatSession | null
  messages: ChatMessage[]
  isTyping: boolean
  
  toggleChat: () => void
  sendMessage: (message: string) => void
  receiveMessage: (message: string) => void
  startSession: () => void
  endSession: () => void
  setTyping: (typing: boolean) => void
}

// 키워드 기반 자동 응답
const getAutoResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  // 인사말
  if (lowerMessage.includes('안녕') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
    return '안녕하세요! K-Shop 고객센터입니다. 무엇을 도와드릴까요? 😊'
  }
  
  // 주문 관련
  if (lowerMessage.includes('주문') || lowerMessage.includes('order')) {
    if (lowerMessage.includes('조회') || lowerMessage.includes('확인')) {
      return '주문 조회는 마이페이지 > 주문내역에서 확인하실 수 있습니다. 주문번호를 알려주시면 제가 직접 확인해드릴게요.'
    }
    if (lowerMessage.includes('취소')) {
      return '주문 취소는 배송 준비 전까지 가능합니다. 마이페이지에서 직접 취소하시거나, 주문번호를 알려주시면 도와드리겠습니다.'
    }
    return '주문 관련 문의시군요. 구체적으로 어떤 도움이 필요하신가요?'
  }
  
  // 배송 관련
  if (lowerMessage.includes('배송') || lowerMessage.includes('delivery')) {
    if (lowerMessage.includes('언제') || lowerMessage.includes('기간')) {
      return '일반 배송은 2-3일, 당일 배송 상품은 오후 2시 이전 주문시 당일 도착합니다. 제주/도서산간 지역은 추가 1-2일 소요됩니다.'
    }
    if (lowerMessage.includes('추적') || lowerMessage.includes('조회')) {
      return '배송 조회는 마이페이지 > 주문내역에서 운송장 번호로 확인 가능합니다. 주문번호를 알려주시면 현재 배송 상태를 확인해드릴게요.'
    }
    return '배송은 보통 2-3일 정도 소요되며, 5만원 이상 구매시 무료배송입니다.'
  }
  
  // 교환/환불
  if (lowerMessage.includes('교환') || lowerMessage.includes('환불') || lowerMessage.includes('반품')) {
    return '상품 수령 후 7일 이내 교환/환불 가능합니다. 단순 변심의 경우 왕복 배송비가 발생할 수 있습니다. 마이페이지에서 신청하시거나 고객센터로 연락주세요.'
  }
  
  // 상품 문의
  if (lowerMessage.includes('상품') || lowerMessage.includes('제품')) {
    if (lowerMessage.includes('재고')) {
      return '상품 재고는 상품 상세페이지에서 실시간으로 확인 가능합니다. 특정 상품명을 알려주시면 재고를 확인해드릴게요.'
    }
    if (lowerMessage.includes('추천')) {
      return '인기 상품은 홈페이지 베스트 섹션에서 확인하실 수 있습니다. 어떤 카테고리의 상품을 찾으시나요?'
    }
    return '상품 관련 문의시군요. 어떤 상품에 대해 궁금하신가요?'
  }
  
  // 쿠폰/포인트
  if (lowerMessage.includes('쿠폰') || lowerMessage.includes('포인트')) {
    return '쿠폰과 포인트는 결제시 자동 적용됩니다. 보유 쿠폰은 마이페이지에서 확인 가능하며, 구매금액의 1% 포인트가 적립됩니다.'
  }
  
  // 회원가입/로그인
  if (lowerMessage.includes('회원가입') || lowerMessage.includes('가입')) {
    return '회원가입시 5,000 포인트를 즉시 지급해드립니다! 소셜 로그인(구글, 카카오, 네이버)으로 간편하게 가입하실 수 있어요.'
  }
  
  if (lowerMessage.includes('로그인')) {
    return '로그인 문제가 있으신가요? 비밀번호를 잊으셨다면 로그인 페이지에서 "비밀번호 찾기"를 이용해주세요.'
  }
  
  // 결제
  if (lowerMessage.includes('결제') || lowerMessage.includes('payment')) {
    return '신용카드, 무통장입금, 카카오페이, 네이버페이 등 다양한 결제수단을 지원합니다. 결제 오류시 다른 결제수단을 이용해보세요.'
  }
  
  // 감사 인사
  if (lowerMessage.includes('감사') || lowerMessage.includes('고마')) {
    return '도움이 되어 기쁩니다! 추가로 궁금하신 점이 있으시면 언제든 문의해주세요. 😊'
  }
  
  // 기본 응답
  return '문의 내용을 확인중입니다. 잠시만 기다려주시면 자세히 안내해드리겠습니다. 급하신 경우 고객센터(02-1234-5678)로 전화주세요.'
}

export const useChatStore = create<ChatStore>((set, get) => ({
  isOpen: false,
  session: null,
  messages: [],
  isTyping: false,

  toggleChat: () => {
    const isOpen = get().isOpen
    if (!isOpen) {
      get().startSession()
    }
    set({ isOpen: !isOpen })
  },

  sendMessage: (message) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      message,
      timestamp: new Date().toISOString()
    }

    set((state) => ({
      messages: [...state.messages, newMessage]
    }))

    // 키워드 기반 자동 응답
    setTimeout(() => {
      set({ isTyping: true })
      
      setTimeout(() => {
        const response = getAutoResponse(message)
        get().receiveMessage(response)
        set({ isTyping: false })
      }, 1500)
    }, 500)
  },

  receiveMessage: (message) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'agent',
      message,
      timestamp: new Date().toISOString()
    }

    set((state) => ({
      messages: [...state.messages, newMessage]
    }))
  },

  startSession: () => {
    const session: ChatSession = {
      id: Date.now().toString(),
      userId: '1',
      messages: [],
      status: 'connected',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const welcomeMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'agent',
      message: '안녕하세요! K-Shop 고객센터입니다. 무엇을 도와드릴까요?',
      timestamp: new Date().toISOString()
    }

    set({
      session,
      messages: [welcomeMessage]
    })
  },

  endSession: () => {
    set({
      session: null,
      messages: [],
      isOpen: false
    })
  },

  setTyping: (typing) => {
    set({ isTyping: typing })
  }
}))
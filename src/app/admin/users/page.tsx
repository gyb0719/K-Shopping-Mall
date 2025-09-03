'use client'

import { useState, useEffect } from 'react'
import { Search, Filter, MoreVertical, Mail, Calendar, ShoppingBag } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'

interface User {
  id: string
  name: string
  email: string
  phone: string
  joinDate: string
  totalOrders: number
  totalSpent: number
  status: 'active' | 'inactive' | 'blocked'
  level: 'bronze' | 'silver' | 'gold' | 'vip'
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')

  useEffect(() => {
    // 더미 데이터
    const dummyUsers: User[] = [
      {
        id: '1',
        name: '김철수',
        email: 'kim@example.com',
        phone: '010-1234-5678',
        joinDate: '2024-01-15',
        totalOrders: 12,
        totalSpent: 1250000,
        status: 'active',
        level: 'gold'
      },
      {
        id: '2',
        name: '이영희',
        email: 'lee@example.com',
        phone: '010-2345-6789',
        joinDate: '2024-02-20',
        totalOrders: 8,
        totalSpent: 850000,
        status: 'active',
        level: 'silver'
      },
      {
        id: '3',
        name: '박민수',
        email: 'park@example.com',
        phone: '010-3456-7890',
        joinDate: '2024-03-10',
        totalOrders: 3,
        totalSpent: 320000,
        status: 'inactive',
        level: 'bronze'
      },
      {
        id: '4',
        name: '정수진',
        email: 'jung@example.com',
        phone: '010-4567-8901',
        joinDate: '2024-01-05',
        totalOrders: 25,
        totalSpent: 3500000,
        status: 'active',
        level: 'vip'
      }
    ]
    setUsers(dummyUsers)
  }, [])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const getLevelBadgeVariant = (level: string) => {
    switch(level) {
      case 'vip': return 'default'
      case 'gold': return 'secondary'
      case 'silver': return 'outline'
      default: return 'outline'
    }
  }

  const getStatusBadgeVariant = (status: string) => {
    switch(status) {
      case 'active': return 'success'
      case 'inactive': return 'secondary'
      case 'blocked': return 'destructive'
      default: return 'outline'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">고객 관리</h1>
        <div className="flex gap-3">
          <Button variant="outline">내보내기</Button>
          <Button>고객 초대</Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">전체 고객</p>
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-xs text-green-600">+12% 지난달 대비</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">활성 고객</p>
            <p className="text-2xl font-bold">{users.filter(u => u.status === 'active').length}</p>
            <p className="text-xs text-green-600">+8% 지난달 대비</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">VIP 고객</p>
            <p className="text-2xl font-bold">{users.filter(u => u.level === 'vip').length}</p>
            <p className="text-xs text-green-600">+2명 증가</p>
          </div>
        </Card>
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">평균 구매액</p>
            <p className="text-2xl font-bold">₩{(users.reduce((sum, u) => sum + u.totalSpent, 0) / users.length / 1000).toFixed(0)}K</p>
            <p className="text-xs text-green-600">+15% 증가</p>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 border-b">
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="고객 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">모든 상태</option>
              <option value="active">활성</option>
              <option value="inactive">비활성</option>
              <option value="blocked">차단</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              필터
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr>
                <th className="text-left p-4">고객명</th>
                <th className="text-left p-4">연락처</th>
                <th className="text-left p-4">가입일</th>
                <th className="text-left p-4">주문 수</th>
                <th className="text-left p-4">총 구매액</th>
                <th className="text-left p-4">등급</th>
                <th className="text-left p-4">상태</th>
                <th className="text-left p-4"></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-muted/50">
                  <td className="p-4">
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                  </td>
                  <td className="p-4">{user.phone}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      {user.joinDate}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                      {user.totalOrders}
                    </div>
                  </td>
                  <td className="p-4">₩{user.totalSpent.toLocaleString()}</td>
                  <td className="p-4">
                    <Badge variant={getLevelBadgeVariant(user.level)}>
                      {user.level.toUpperCase()}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={getStatusBadgeVariant(user.status)}>
                      {user.status === 'active' ? '활성' : user.status === 'inactive' ? '비활성' : '차단'}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
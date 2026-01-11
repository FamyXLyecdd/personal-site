'use client'

import { useState, useMemo, DragEvent } from 'react'
import { motion, AnimatePresence, Reorder } from 'framer-motion'
import Link from 'next/link'
import {
    Plus,
    Search,
    Filter,
    Calendar,
    LayoutGrid,
    List,
    ChevronDown,
    MoreHorizontal,
    Clock,
    Tag,
    Users,
    MessageSquare,
    Paperclip,
    CheckCircle2,
    Circle,
    AlertCircle,
    Zap,
    X,
    Edit3,
    Trash2,
    Copy,
    ArrowRight,
    CalendarDays,
    User,
    Bell,
    Settings,
    Home,
    Folder,
    BarChart3,
    Star,
    Archive,
} from 'lucide-react'

// ========================================
// TYPES
// ========================================

type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'
type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'review' | 'done'

interface Task {
    id: string
    title: string
    description: string
    status: TaskStatus
    priority: TaskPriority
    assignee?: {
        name: string
        avatar: string
    }
    dueDate?: string
    tags: string[]
    comments: number
    attachments: number
    subtasks: { total: number; completed: number }
}

interface Column {
    id: TaskStatus
    title: string
    color: string
    icon: React.ReactNode
}

// ========================================
// SAMPLE DATA
// ========================================

const columns: Column[] = [
    { id: 'backlog', title: 'Backlog', color: '#6B7280', icon: <Archive className="w-4 h-4" /> },
    { id: 'todo', title: 'To Do', color: '#3B82F6', icon: <Circle className="w-4 h-4" /> },
    { id: 'in-progress', title: 'In Progress', color: '#F59E0B', icon: <Clock className="w-4 h-4" /> },
    { id: 'review', title: 'Review', color: '#8B5CF6', icon: <AlertCircle className="w-4 h-4" /> },
    { id: 'done', title: 'Done', color: '#10B981', icon: <CheckCircle2 className="w-4 h-4" /> },
]

const initialTasks: Task[] = [
    {
        id: 't1',
        title: 'Design new landing page',
        description: 'Create a modern, conversion-focused landing page design',
        status: 'in-progress',
        priority: 'high',
        assignee: { name: 'Sarah', avatar: '👩‍🎨' },
        dueDate: 'Jan 20',
        tags: ['Design', 'Marketing'],
        comments: 8,
        attachments: 3,
        subtasks: { total: 5, completed: 3 },
    },
    {
        id: 't2',
        title: 'Implement user authentication',
        description: 'Add OAuth and JWT authentication system',
        status: 'in-progress',
        priority: 'urgent',
        assignee: { name: 'Mike', avatar: '👨‍💻' },
        dueDate: 'Jan 18',
        tags: ['Backend', 'Security'],
        comments: 12,
        attachments: 1,
        subtasks: { total: 8, completed: 5 },
    },
    {
        id: 't3',
        title: 'Write API documentation',
        description: 'Document all REST API endpoints with examples',
        status: 'todo',
        priority: 'medium',
        assignee: { name: 'Alex', avatar: '📝' },
        dueDate: 'Jan 25',
        tags: ['Docs'],
        comments: 3,
        attachments: 0,
        subtasks: { total: 3, completed: 0 },
    },
    {
        id: 't4',
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment',
        status: 'review',
        priority: 'high',
        assignee: { name: 'Tom', avatar: '🔧' },
        dueDate: 'Jan 15',
        tags: ['DevOps'],
        comments: 5,
        attachments: 2,
        subtasks: { total: 4, completed: 4 },
    },
    {
        id: 't5',
        title: 'Fix mobile responsive issues',
        description: 'Address layout bugs on smaller screens',
        status: 'done',
        priority: 'medium',
        assignee: { name: 'Lisa', avatar: '📱' },
        dueDate: 'Jan 12',
        tags: ['Bug', 'Frontend'],
        comments: 6,
        attachments: 4,
        subtasks: { total: 6, completed: 6 },
    },
    {
        id: 't6',
        title: 'Database optimization',
        description: 'Improve query performance and add indexes',
        status: 'backlog',
        priority: 'low',
        tags: ['Backend', 'Performance'],
        comments: 2,
        attachments: 0,
        subtasks: { total: 2, completed: 0 },
    },
    {
        id: 't7',
        title: 'User feedback integration',
        description: 'Add in-app feedback collection system',
        status: 'todo',
        priority: 'medium',
        assignee: { name: 'Emma', avatar: '💬' },
        dueDate: 'Jan 30',
        tags: ['Feature', 'UX'],
        comments: 4,
        attachments: 1,
        subtasks: { total: 4, completed: 1 },
    },
    {
        id: 't8',
        title: 'Security audit',
        description: 'Conduct comprehensive security review',
        status: 'backlog',
        priority: 'high',
        tags: ['Security'],
        comments: 0,
        attachments: 0,
        subtasks: { total: 0, completed: 0 },
    },
]

// ========================================
// SIDEBAR
// ========================================

function Sidebar() {
    const menuItems = [
        { icon: <Home className="w-5 h-5" />, label: 'Dashboard', active: false },
        { icon: <LayoutGrid className="w-5 h-5" />, label: 'Board', active: true },
        { icon: <List className="w-5 h-5" />, label: 'List View', active: false },
        { icon: <Calendar className="w-5 h-5" />, label: 'Calendar', active: false },
        { icon: <BarChart3 className="w-5 h-5" />, label: 'Reports', active: false },
    ]

    const projects = [
        { name: 'Website Redesign', color: '#3B82F6', count: 12 },
        { name: 'Mobile App', color: '#10B981', count: 8 },
        { name: 'Marketing Campaign', color: '#F59E0B', count: 5 },
        { name: 'API Development', color: '#8B5CF6', count: 15 },
    ]

    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col h-full">
            {/* Logo */}
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                        <Zap className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold">TaskFlow</span>
                </div>
            </div>

            {/* Nav */}
            <nav className="px-3 space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.label}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${item.active
                                ? 'bg-indigo-600 text-white'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white'
                            }`}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Projects */}
            <div className="mt-8 px-3">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Projects</span>
                    <button className="text-gray-500 hover:text-white">
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
                <div className="space-y-1">
                    {projects.map((project) => (
                        <button
                            key={project.name}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-colors"
                        >
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: project.color }} />
                            <span className="flex-1 text-left text-sm truncate">{project.name}</span>
                            <span className="text-xs text-gray-500">{project.count}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* User */}
            <div className="mt-auto p-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-lg">
                        👤
                    </div>
                    <div className="flex-1">
                        <p className="font-medium text-sm">John Doe</p>
                        <p className="text-xs text-gray-400">Admin</p>
                    </div>
                    <button className="text-gray-400 hover:text-white">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </aside>
    )
}

// ========================================
// HEADER
// ========================================

function Header() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <h1 className="text-xl font-bold">Website Redesign</h1>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                    In Progress
                </span>
            </div>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="pl-10 pr-4 py-2 bg-gray-100 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                    />
                </div>

                {/* Filter */}
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50">
                    <Filter className="w-4 h-4" />
                    Filter
                </button>

                {/* New task */}
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
                    <Plus className="w-4 h-4" />
                    New Task
                </button>

                {/* Notifications */}
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                    JD
                </div>
            </div>
        </header>
    )
}

// ========================================
// TASK CARD
// ========================================

function TaskCard({ task }: { task: Task }) {
    const priorityColors = {
        low: 'bg-gray-100 text-gray-600',
        medium: 'bg-blue-100 text-blue-600',
        high: 'bg-orange-100 text-orange-600',
        urgent: 'bg-red-100 text-red-600',
    }

    return (
        <motion.div
            className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow group cursor-pointer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            layout
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <span className={`px-2 py-0.5 text-xs font-medium rounded ${priorityColors[task.priority]}`}>
                    {task.priority}
                </span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            {/* Title */}
            <h3 className="font-medium mb-2">{task.title}</h3>
            <p className="text-sm text-gray-500 mb-3 line-clamp-2">{task.description}</p>

            {/* Tags */}
            {task.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                    {task.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            {/* Progress (subtasks) */}
            {task.subtasks.total > 0 && (
                <div className="mb-3">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>Subtasks</span>
                        <span>{task.subtasks.completed}/{task.subtasks.total}</span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${(task.subtasks.completed / task.subtasks.total) * 100}%` }}
                        />
                    </div>
                </div>
            )}

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-3">
                    {/* Assignee */}
                    {task.assignee && (
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-sm" title={task.assignee.name}>
                            {task.assignee.avatar}
                        </div>
                    )}
                    {/* Due date */}
                    {task.dueDate && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                            <CalendarDays className="w-3 h-3" />
                            {task.dueDate}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                    {task.comments > 0 && (
                        <div className="flex items-center gap-1 text-xs">
                            <MessageSquare className="w-3 h-3" />
                            {task.comments}
                        </div>
                    )}
                    {task.attachments > 0 && (
                        <div className="flex items-center gap-1 text-xs">
                            <Paperclip className="w-3 h-3" />
                            {task.attachments}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    )
}

// ========================================
// KANBAN COLUMN
// ========================================

function KanbanColumn({ column, tasks }: { column: Column; tasks: Task[] }) {
    return (
        <div className="flex-shrink-0 w-80">
            {/* Column header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <div style={{ color: column.color }}>{column.icon}</div>
                    <span className="font-semibold">{column.title}</span>
                    <span className="w-6 h-6 rounded-full bg-gray-100 text-xs flex items-center justify-center text-gray-500">
                        {tasks.length}
                    </span>
                </div>
                <button className="p-1 hover:bg-gray-100 rounded">
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            {/* Tasks */}
            <div className="space-y-3">
                <AnimatePresence>
                    {tasks.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Add task button */}
            <button className="w-full mt-3 py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg flex items-center justify-center gap-1">
                <Plus className="w-4 h-4" />
                Add task
            </button>
        </div>
    )
}

// ========================================
// MAIN PAGE
// ========================================

export default function ProjectManagementPage() {
    const [tasks] = useState(initialTasks)

    const tasksByStatus = useMemo(() => {
        const grouped: Record<TaskStatus, Task[]> = {
            backlog: [],
            todo: [],
            'in-progress': [],
            review: [],
            done: [],
        }
        tasks.forEach((task) => {
            grouped[task.status].push(task)
        })
        return grouped
    }, [tasks])

    return (
        <div className="h-screen flex bg-gray-50">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />

                {/* Kanban board */}
                <main className="flex-1 overflow-x-auto p-6">
                    <div className="flex gap-6 min-w-max">
                        {columns.map((column) => (
                            <KanbanColumn
                                key={column.id}
                                column={column}
                                tasks={tasksByStatus[column.id]}
                            />
                        ))}
                    </div>
                </main>

                {/* Footer */}
                <div className="p-4 text-center text-sm text-gray-500">
                    Demo by{' '}
                    <Link href="/" className="text-indigo-600 hover:underline">
                        YourName
                    </Link>
                </div>
            </div>
        </div>
    )
}

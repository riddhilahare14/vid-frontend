import React, { useState, useEffect } from 'react'
import { formatDate } from "./client-workspace"
import { 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  MessageSquare, 
  Upload, 
  Download, 
  Plus, 
  Edit2, 
  Trash2, 
  X,
  Save,
  Calendar
} from "lucide-react"

export function TimelineSection({ job }) {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: ''
  })

  // Fetch timeline events
  useEffect(() => {
    if (job?.id) {
      fetchTimelineEvents()
    }
  }, [job?.id])

  const fetchTimelineEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch(`http://localhost:3000/api/v1/projects/${job.id}/timeline`)
      if (response.ok) {
        const data = await response.json()
        setEvents(data)
      }
    } catch (error) {
      console.error('Error fetching timeline events:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.description.trim() || !formData.startDate) {
      alert('Please fill in all required fields')
      return
    }
    try {
      const url = editingEvent 
        ? `http://localhost:3000/api/v1/timeline/${editingEvent.id}`
        : `http://localhost:3000/api/v1/projects/${job.id}/timeline`
      
      const method = editingEvent ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        await fetchTimelineEvents()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving timeline event:', error)
    }
  }

  const handleDelete = async (eventId) => {
    if (!confirm('Are you sure you want to delete this timeline event?')) return
    
    try {
      const response = await fetch(`http://localhost:3000/api/v1/timeline/${eventId}`, {
        method: 'DELETE'
      })
      
      if (response.ok) {
        await fetchTimelineEvents()
      }
    } catch (error) {
      console.error('Error deleting timeline event:', error)
    }
  }

  const handleToggleComplete = async (event) => {
    try {
      const response = await fetch(`/api/v1/timeline/${event.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...event,
          isCompleted: !event.isCompleted
        })
      })

      if (response.ok) {
        await fetchTimelineEvents()
      }
    } catch (error) {
      console.error('Error updating timeline event:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      startDate: '',
      endDate: ''
    })
    setShowAddForm(false)
    setEditingEvent(null)
  }

  const startEdit = (event) => {
    setEditingEvent(event)
    setFormData({
      title: event.title,
      description: event.description,
      startDate: event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : '',
      endDate: event.endDate ? new Date(event.endDate).toISOString().split('T')[0] : ''
    })
    setShowAddForm(true)
  }

  const getEventIcon = (event) => {
    if (event.isCompleted) {
      return <CheckCircle className="w-4 h-4 text-emerald-500" />
    }
    
    // Default icons based on keywords in title/description
    const text = `${event.title} ${event.description}`.toLowerCase()
    
    if (text.includes('upload') || text.includes('file')) {
      return <Upload className="w-4 h-4 text-indigo-500" />
    }
    if (text.includes('download') || text.includes('delivery')) {
      return <Download className="w-4 h-4 text-purple-500" />
    }
    if (text.includes('feedback') || text.includes('review') || text.includes('comment')) {
      return <MessageSquare className="w-4 h-4 text-amber-500" />
    }
    if (text.includes('milestone') || text.includes('complete')) {
      return <CheckCircle className="w-4 h-4 text-emerald-500" />
    }
    
    return <Clock className="w-4 h-4 text-blue-500" />
  }

  const getEventColor = (event) => {
    if (event.isCompleted) {
      return "border-emerald-200 bg-emerald-50 dark:border-emerald-700 dark:bg-emerald-900/20"
    }
    
    const now = new Date()
    const endDate = event.endDate ? new Date(event.endDate) : null
    
    if (endDate && endDate < now) {
      return "border-red-200 bg-red-50 dark:border-red-700 dark:bg-red-900/20"
    }
    
    return "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900/20"
  }

  if (loading) {
    return (
      <div className="h-full p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1 bg-gray-200 rounded-lg h-20"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full p-4">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-1">Project Timeline</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Track project milestones and activities</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Event
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="mb-6 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900 dark:text-white">
              {editingEvent ? 'Edit Timeline Event' : 'Add Timeline Event'}
            </h4>
            <button
              onClick={resetForm}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Save className="w-4 h-4 mr-1 inline" />
                {editingEvent ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {events.length === 0 ? (
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No timeline events yet</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
            Add your first timeline event to get started
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700"></div>

          <div className="space-y-4">
            {events.map((event, index) => (
              <div key={event.id} className="relative flex items-start space-x-4 group">
                {/* Timeline dot */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700">
                  {getEventIcon(event)}
                </div>

                {/* Event content */}
                <div className={`flex-1 p-4 rounded-lg border ${getEventColor(event)} min-h-[60px] relative`}>
                  {/* Action buttons */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleToggleComplete(event)}
                        className="p-1 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400"
                        title={event.isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        <CheckCircle className={`w-4 h-4 ${event.isCompleted ? 'text-emerald-600' : ''}`} />
                      </button>
                      <button
                        onClick={() => startEdit(event)}
                        className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                        title="Edit event"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(event.id)}
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        title="Delete event"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start justify-between mb-2 pr-12">
                    <h4 className={`font-medium text-gray-900 dark:text-white text-sm ${event.isCompleted ? 'line-through text-gray-500' : ''}`}>
                      {event.title}
                    </h4>
                    <div className="text-right">
                      {event.startDate && (
                        <time className="text-xs text-gray-500 dark:text-gray-400 block">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {formatDate(event.startDate)}
                        </time>
                      )}
                      {event.endDate && event.startDate !== event.endDate && (
                        <time className="text-xs text-gray-500 dark:text-gray-400 block">
                          → {formatDate(event.endDate)}
                        </time>
                      )}
                    </div>
                  </div>

                  <p className={`text-sm text-gray-600 dark:text-gray-400 mb-2 ${event.isCompleted ? 'line-through text-gray-400' : ''}`}>
                    {event.description}
                  </p>

                  {event.isCompleted && (
                    <div className="flex items-center text-xs text-emerald-600 dark:text-emerald-400">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Completed
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
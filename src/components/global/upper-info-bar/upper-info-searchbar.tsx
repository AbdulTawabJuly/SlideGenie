"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

const SearchBar = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')

  // Initialize search query from URL params
  useEffect(() => {
    const query = searchParams.get('search') || ''
    setSearchQuery(query)
  }, [searchParams])

  const updateSearchParams = useCallback((query: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (query.trim()) {
      params.set('search', query.trim())
    } else {
      params.delete('search')
    }
    
    const newUrl = params.toString() ? `?${params.toString()}` : window.location.pathname
    router.push(newUrl)
  }, [searchParams, router])

  // Debounced search using useEffect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery !== (searchParams.get('search') || '')) {
        updateSearchParams(searchQuery)
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery, searchParams, updateSearchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateSearchParams(searchQuery)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      updateSearchParams(searchQuery)
    }
    if (e.key === 'Escape') {
      clearSearch()
    }
  }

  const clearSearch = () => {
    setSearchQuery('')
    updateSearchParams('')
  }

  return (
    <form onSubmit={handleSearch} className='min-w-[60%] relative flex items-center border rounded-full bg-primary-90'>
      <Button
        type='submit'
        size="sm"
        variant="ghost"
        className="absolute left-0 h-full rounded-l-none bg-transparent hover:bg-transparent z-10"
      >
        <Search className='h-4 w-4'/>
        <span className='sr-only'>Search</span>
      </Button>
      
      <Input
        type='text'
        placeholder='Search projects by title...'
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        className='flex-grow bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 pl-10 pr-10'
      />
      
      {searchQuery && (
        <Button
          type="button"
          size="sm"
          variant="ghost"
          onClick={clearSearch}
          className="absolute right-0 h-full rounded-r-none bg-transparent hover:bg-transparent z-10"
        >
          <X className='h-4 w-4'/>
          <span className='sr-only'>Clear search</span>
        </Button>
      )}
    </form>
  )
}



export default SearchBar
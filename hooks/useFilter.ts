'use client'
import { useState, useCallback } from 'react'
import type { FilterState, NftCategory, ChainName } from '@/lib/types'

const DEFAULT: FilterState = {
  status: [], priceMin: '', priceMax: '',
  categories: [], traits: {}, chains: [],
  sortBy: 'recently_listed',
}

export function useFilter() {
  const [filters, setFilters] = useState<FilterState>(DEFAULT)

  const toggleStatus = useCallback((s: string) =>
    setFilters(f => ({
      ...f,
      status: f.status.includes(s) ? f.status.filter(x => x !== s) : [...f.status, s],
    })), [])

  const toggleCategory = useCallback((c: NftCategory) =>
    setFilters(f => ({
      ...f,
      categories: f.categories.includes(c) ? f.categories.filter(x => x !== c) : [...f.categories, c],
    })), [])

  const toggleChain = useCallback((c: ChainName) =>
    setFilters(f => ({
      ...f,
      chains: f.chains.includes(c) ? f.chains.filter(x => x !== c) : [...f.chains, c],
    })), [])

  const toggleTrait = useCallback((group: string, value: string) =>
    setFilters(f => {
      const cur = f.traits[group] ?? []
      return {
        ...f,
        traits: {
          ...f.traits,
          [group]: cur.includes(value) ? cur.filter(x => x !== value) : [...cur, value],
        },
      }
    }), [])

  const setPrice = useCallback((min: string, max: string) =>
    setFilters(f => ({ ...f, priceMin: min, priceMax: max })), [])

  const setSort = useCallback((s: FilterState['sortBy']) =>
    setFilters(f => ({ ...f, sortBy: s })), [])

  const clearAll = useCallback(() => setFilters(DEFAULT), [])

  const removeTrait = useCallback((group: string, value: string) =>
    setFilters(f => ({
      ...f,
      traits: { ...f.traits, [group]: (f.traits[group] ?? []).filter(x => x !== value) },
    })), [])

  const activeCount =
    filters.status.length +
    filters.categories.length +
    filters.chains.length +
    Object.values(filters.traits).flat().length +
    (filters.priceMin || filters.priceMax ? 1 : 0)

  return { filters, toggleStatus, toggleCategory, toggleChain, toggleTrait,
           setPrice, setSort, clearAll, removeTrait, activeCount }
}

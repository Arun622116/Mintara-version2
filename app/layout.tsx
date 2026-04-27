'use client'
import './globals.css'
import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { useState, createContext, useContext, useRef, useCallback, useEffect } from 'react'
import type { ReactNode } from 'react'
import TopNav from '@/components/layout/TopNav'
import MobileNav from '@/components/layout/MobileNav'
import MobileDrawer from '@/components/layout/MobileDrawer'
import SearchModal from '@/components/layout/SearchModal'
import Toast from '@/components/ui/Toast'

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700'], variable: '--font-inter', display: 'swap' })
const plusJakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700','800'], variable: '--font-plus-jakarta', display: 'swap' })

interface ToastCtx { showToast: (msg: string, type?: 'info'|'success') => void }
export const ToastContext = createContext<ToastCtx>({ showToast: () => {} })
export function useToast() { return useContext(ToastContext) }

interface SearchCtx { isOpen: boolean; open: () => void; close: () => void }
export const SearchContext = createContext<SearchCtx>({ isOpen: false, open: () => {}, close: () => {} })
export function useSearch() { return useContext(SearchContext) }

interface DrawerCtx { isOpen: boolean; toggle: () => void; close: () => void }
export const DrawerContext = createContext<DrawerCtx>({ isOpen: false, toggle: () => {}, close: () => {} })
export function useDrawer() { return useContext(DrawerContext) }

export default function RootLayout({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState({ message: '', type: 'info' as 'info'|'success', visible: false })
  const [searchOpen, setSearchOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const showToast = useCallback((message: string, type: 'info'|'success' = 'info') => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setToast({ message, type, visible: true })
    timerRef.current = setTimeout(() => setToast(p => ({ ...p, visible: false })), 2800)
  }, [])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setSearchOpen(true) }
      if (e.key === 'Escape') { setSearchOpen(false); setDrawerOpen(false) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable}`}>
      <body>
        <ToastContext.Provider value={{ showToast }}>
          <SearchContext.Provider value={{ isOpen: searchOpen, open: () => setSearchOpen(true), close: () => setSearchOpen(false) }}>
            <DrawerContext.Provider value={{ isOpen: drawerOpen, toggle: () => setDrawerOpen(p => !p), close: () => setDrawerOpen(false) }}>
              <TopNav />
              <main>{children}</main>
              <MobileNav />
              <MobileDrawer />
              {searchOpen && <SearchModal />}
              <Toast toast={toast} />
            </DrawerContext.Provider>
          </SearchContext.Provider>
        </ToastContext.Provider>
      </body>
    </html>
  )
}

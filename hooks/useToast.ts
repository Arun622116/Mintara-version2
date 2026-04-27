'use client'
import { createContext, useContext, useState, useRef, useCallback } from 'react'

export interface ToastState {
  message: string
  type: 'info' | 'success'
  visible: boolean
}

export interface ToastContextValue {
  toast: ToastState
  showToast: (message: string, type?: 'info' | 'success') => void
}

import { createContext as _c } from 'react'
export const ToastContext = createContext<ToastContextValue>({
  toast: { message: '', type: 'info', visible: false },
  showToast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

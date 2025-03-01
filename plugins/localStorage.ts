// plugins/localStorage.ts
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      localStorage: {
        setItem(key: string, value: any): void {
          if (typeof window !== 'undefined') {
            window.localStorage.setItem(key, JSON.stringify(value));
          }
        },
        getItem<T = any>(key: string): T | null {
          if (typeof window !== 'undefined') {
            const value = window.localStorage.getItem(key);
            if (value) {
              try {
                return JSON.parse(value) as T;
              } catch (e) {
                console.error('Error parsing JSON from localStorage', e);
                return null;
              }
            }
          }
          return null;
        },
        removeItem(key: string): void {
          if (typeof window !== 'undefined') {
            window.localStorage.removeItem(key);
          }
        },
        clear(): void {
          if (typeof window !== 'undefined') {
            window.localStorage.clear();
          }
        },
        // Helper to check if a key exists
        hasItem(key: string): boolean {
          if (typeof window !== 'undefined') {
            return window.localStorage.getItem(key) !== null;
          }
          return false;
        }
      }
    }
  }
})
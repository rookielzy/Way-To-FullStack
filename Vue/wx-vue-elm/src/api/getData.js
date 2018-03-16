import fetch from '@/config/fetch'

export const restaurants = () => fetch('GET', 'restaurants', {})

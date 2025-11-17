// Mock data as fallback if API fails
const MOCK_USERS = [
  { id: 1, email: "george.bluth@reqres.in", first_name: "George", last_name: "Bluth", avatar: "https://reqres.in/img/faces/1-image.jpg" },
  { id: 2, email: "janet.weaver@reqres.in", first_name: "Janet", last_name: "Weaver", avatar: "https://reqres.in/img/faces/2-image.jpg" },
  { id: 3, email: "emma.wong@reqres.in", first_name: "Emma", last_name: "Wong", avatar: "https://reqres.in/img/faces/3-image.jpg" },
  { id: 4, email: "eve.holt@reqres.in", first_name: "Eve", last_name: "Holt", avatar: "https://reqres.in/img/faces/4-image.jpg" },
  { id: 5, email: "charles.morris@reqres.in", first_name: "Charles", last_name: "Morris", avatar: "https://reqres.in/img/faces/5-image.jpg" },
  { id: 6, email: "tracey.ramos@reqres.in", first_name: "Tracey", last_name: "Ramos", avatar: "https://reqres.in/img/faces/6-image.jpg" },
  { id: 7, email: "michael.lawson@reqres.in", first_name: "Michael", last_name: "Lawson", avatar: "https://reqres.in/img/faces/7-image.jpg" },
  { id: 8, email: "lindsay.ferguson@reqres.in", first_name: "Lindsay", last_name: "Ferguson", avatar: "https://reqres.in/img/faces/8-image.jpg" },
  { id: 9, email: "tobias.funke@reqres.in", first_name: "Tobias", last_name: "Funke", avatar: "https://reqres.in/img/faces/9-image.jpg" },
  { id: 10, email: "byron.fields@reqres.in", first_name: "Byron", last_name: "Fields", avatar: "https://reqres.in/img/faces/10-image.jpg" },
  { id: 11, email: "george.edwards@reqres.in", first_name: "George", last_name: "Edwards", avatar: "https://reqres.in/img/faces/11-image.jpg" },
  { id: 12, email: "rachel.howell@reqres.in", first_name: "Rachel", last_name: "Howell", avatar: "https://reqres.in/img/faces/12-image.jpg" }
]

const BASE = 'https://reqres.in/api/users'

export async function fetchAllUsers() {
  try {
    console.log('Fetching from:', `${BASE}?page=1`)
    
    // Try fetching from API
    const res1 = await fetch(`${BASE}?page=1`, {
      method: 'GET',
      mode: 'cors',
    })
    
    console.log('Response status:', res1.status)
    
    // If we get 401, use mock data
    if (res1.status === 401) {
      console.warn('API returned 401, using mock data instead')
      return MOCK_USERS
    }
    
    if (!res1.ok) {
      const errorText = await res1.text()
      console.error('Error response:', errorText)
      throw new Error(`HTTP error! status: ${res1.status}`)
    }
    
    const data1 = await res1.json()
    console.log('First page data:', data1)
    
    const totalPages = data1.total_pages || 1
    let users = data1.data || []

    // Fetch remaining pages
    const fetches = []
    for (let p = 2; p <= totalPages; p++) {
      fetches.push(
        fetch(`${BASE}?page=${p}`, {
          method: 'GET',
          mode: 'cors',
        }).then(r => {
          if (!r.ok) throw new Error(`HTTP error on page ${p}! status: ${r.status}`)
          return r.json()
        })
      )
    }

    if (fetches.length) {
      const pages = await Promise.all(fetches)
      for (const p of pages) {
        users = users.concat(p.data || [])
      }
    }

    console.log('Total users fetched:', users.length)
    return users
  } catch (error) {
    console.error('API Error, falling back to mock data:', error)
    // Return mock data if API fails
    return MOCK_USERS
  }
}
// /pages/api/contact.js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const { name, email, message } = req.body
  console.log('Incoming data:', { name, email, message }) // Debugging

  try {
    const { data, error } = await supabase
      .from('contact') // ✅ Corrected table name
      .insert([{ name, email, message }])

    console.log('Supabase response:', { data, error }) // Debugging

    if (error) {
      return res.status(500).json({ error: 'Failed to submit message' })
    }

    return res.status(200).json({ message: 'Message submitted successfully!' })
  } catch (err) {
    console.error('Server Error:', err)
    return res.status(500).json({ error: 'Server error' })
  }
}
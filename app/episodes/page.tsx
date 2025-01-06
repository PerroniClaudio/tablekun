import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: episodes } = await supabase.from('episodes').select()

  return <pre>{JSON.stringify(episodes, null, 2)}</pre>
}
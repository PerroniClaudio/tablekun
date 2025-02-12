import EpisodesList from '@/components/episodes/list'
import VideoPlayer from '@/components/player'
import { createClient } from '@/utils/supabase/server'

export default async function Page() {
  const supabase = await createClient()
  const { data: episodes } = await supabase.from('episodes').select()

  return <div>
    <div className='mt-8'>
      {episodes && (
        <EpisodesList episodes={episodes} />
      )}
    </div>
  </div>
}
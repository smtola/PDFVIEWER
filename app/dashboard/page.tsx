
'use server'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import DashboardClient from './DashboardClient';

export default async function Dashboard() {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
        redirect('/login')
    }

    return <DashboardClient user={{ email: data.user.email ?? 'Guest', id: data.user.id }} />;
}
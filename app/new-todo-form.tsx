"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
export default async function NewTodoForm() {
    const { register, handleSubmit }  = useForm()
    const router = useRouter()
    const supabase = createClientComponentClient()
    const { data: { session } } = await supabase.auth.getSession()
    const onSubmit = async ({ name }:{ name }) => {
        await supabase.from("todos").insert({ name, user_id: session?.user.id  })
        router.refresh()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name")} className="text-black" />
        </form>
    )
}
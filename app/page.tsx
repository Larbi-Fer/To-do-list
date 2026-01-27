'use client'

import { supabase } from "@/utils/supabaseClient";

export default function Home() {
  const fn = async () => {
    console.log(await supabase.auth.signUp({
      email: 'ferhaoui.20044@gmail.com',
      password: '123456',
    }))
  }
  
  return (
    <div>
      Hello world
      <button onClick={fn}>Button</button>
      <br />
      <button onClick={async() =>{
        supabase.auth.signOut()
      }}>Button2</button>
    </div>
  );
}

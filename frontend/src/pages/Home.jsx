import React from 'react'
import Hero from '../components/Home/Hero'
import ReacentlyAdded from '../components/Home/RecentlyAdded'

const Home = () => {
  return (
    <div className="bg-zinc-900 text-white px-10 py-8">
      <Hero />
      <ReacentlyAdded />
    </div>
  )
}

export default Home

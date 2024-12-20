import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Loader from '../components/Loader/Loader'
import BookCard from '../components/BookCard/BookCard'

const AllBooks = () => {
  const [Data, setData] = useState() // Data asli
  const [FilteredData, setFilteredData] = useState() // Data setelah difilter
  const [SearchTerm, setSearchTerm] = useState('') // State untuk teks pencarian

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'http://localhost:1000/api/v1/get-all-books',
      )
      setData(response.data.data)
      setFilteredData(response.data.data) // Inisialisasi data yang difilter
    }
    fetch()
  }, [])

  // Handler untuk pencarian
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase()
    setSearchTerm(term)
    const filtered = Data.filter(
      (book) => book.title.toLowerCase().includes(term), // Filter berdasarkan judul
    )
    setFilteredData(filtered)
  }

  return (
    <div className="bg-zinc-900 h-auto px-12 py-8">
      <h4 className="text-3xl text-yellow-100">All Books</h4>
      {/* Input Pencarian */}
      <div className="my-4">
        <input
          type="text"
          className="w-full md:w-1/2 px-4 py-2 rounded bg-zinc-800 text-white"
          placeholder="Search books by title..."
          value={SearchTerm}
          onChange={handleSearch}
        />
      </div>
      {!FilteredData && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      <div className="my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {FilteredData &&
          FilteredData.map((items, i) => (
            <div key={i}>
              <BookCard data={items} />
            </div>
          ))}
      </div>
      {/* Pesan jika tidak ada hasil */}
      {FilteredData && FilteredData.length === 0 && (
        <div className="text-center text-yellow-200 mt-8">
          <h3 className="text-xl">No books found matching your search.</h3>
        </div>
      )}
    </div>
  )
}

export default AllBooks

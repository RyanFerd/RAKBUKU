import PropTypes from 'prop-types'
import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'

const BookCard = ({ data, favourite }) => {
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
    bookid: data._id,
  }

  // Fungsi untuk memformat harga ke Rupiah
  const formatToRupiah = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleRemoveBook = async () => {
    const response = await axios.put(
      'http://localhost:1000/api/v1/remove-book-from-favourite',
      {},
      { headers },
    )
    alert(response.data.message)
  }

  return (
    <div className="bg-zinc-800 rounded p-4v flex flex-col">
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded p-4 flex flex-col">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt="/" className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl text-white font-semibold">
            {data.title}
          </h2>
          <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">
            {formatToRupiah(data.price)}
          </p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-red-100 px-4 py-2 rounded border border-red-600 text-red-600 mt-4"
          onClick={handleRemoveBook}
        >
          Remove From favourite
        </button>
      )}
    </div>
  )
}

// Validasi props menggunakan PropTypes
BookCard.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  favourite: PropTypes.bool.isRequired,
}

export default BookCard

import WebApp from '@twa-dev/sdk'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hook'
import { fetchRankingById, selectUserRank } from '../app/slice/rankingSlice'

const AnniversaryCard = () => {
  const [year, setYear] = useState(1)
  const dispatch = useAppDispatch()
  const ranking = useAppSelector(selectUserRank)
  const navigate = useNavigate()

  const userId = WebApp.initDataUnsafe?.user?.id ?? 5053674641
  const handleContinue = () => {
    navigate('/reward')
  }

  useEffect(() => {
    if (userId) {
      dispatch(fetchRankingById(userId))
    }
  }, [userId, dispatch])

  useEffect(() => {
    if (ranking?.createdAt) {
      const createdAtDate = new Date(ranking.createdAt)
      const years = handleYear(createdAtDate)
      setYear(years)
    }
  }, [ranking])

  const handleYear = (time: Date) => {
    const year = time.getFullYear()
    const currentYear = new Date().getFullYear()
    const differentYear = currentYear - year
    return differentYear > 1 ? differentYear : 1
  }
  return (
    <div
      className="min-h-screen flex flex-col justify-between bg-black text-white p-4 hover:bg-cover focus:bg-cover"
      style={{
        backgroundImage: 'url(https://wallpapercave.com/wp/wp10649036.jpg)',
      }}>
      <div className="text-center  flex-grow overflow-y-auto pb-20">
        <h1 className="text-4xl font-bold mt-4">Rising star!</h1>
        <p className="text-lg mt-2">You've joined Telegram</p>
        <div className="my-8">
          <div className="relative">
            <img
              width="100%"
              src="https://wallpapercave.com/wp/wp10649036.jpg"
              alt="Background"
              className="mx-auto w-full"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
              <span className="text-9xl font-bold">{year}</span>
            </div>
          </div>
          <p className="text-4xl font-bold mt-4">years ago</p>
        </div>
        <p className="mt-4 font-bold">
          Your account number is <strong>#{ranking?.ranking ?? 0}</strong>
        </p>
        <p className="font-bold">You're in the Top 70% Telegram users 🔥</p>
      </div>
      <div className="fixed bottom-0 left-0 w-full p-5 z-50  ">
        <button
          onClick={handleContinue}
          className="w-full p-3 bg-white rounded-lg text-black">
          Continue
        </button>
      </div>
    </div>
  )
}

export default AnniversaryCard

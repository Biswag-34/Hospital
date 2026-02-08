import { Routes, Route } from 'react-router-dom'
import MainLayout from './layout/mainlayout'
import ScrollToTop from './component/ScrollToTop'
import HomePage from './pages/HomePage'
import JoinTheCause from './pages/JoinTheCause'

export default function App() {
  return (
    <MainLayout>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/join-the-cause" element={<JoinTheCause />} />
      </Routes>
    </MainLayout>
  )
}

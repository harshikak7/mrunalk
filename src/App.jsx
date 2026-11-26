import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import Grain from './components/Grain'
import Nav from './components/Nav'
import Home from './pages/Home'
import About from './pages/About'
import CaseStudy from './pages/CaseStudy'
import NotFound from './pages/NotFound'

// Strip query strings and hashes so only clean, known URLs are ever shown.
function useCleanUrl() {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    if (search || hash) navigate(pathname, { replace: true })
  }, [pathname, search, hash, navigate])
}

export default function App() {
  useCleanUrl()
  return (
    <>
      <Grain />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/work/:slug" element={<CaseStudy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

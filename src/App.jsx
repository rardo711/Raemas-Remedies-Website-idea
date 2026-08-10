import { HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { ProductDetail } from './pages/ProductDetail'
import { MeetRaeMa } from './pages/MeetRaeMa'
import { Order } from './pages/Order'
import { NotFound } from './pages/NotFound'

/**
 * Hash routing, deliberately: GitHub Pages serves static files only and has no
 * rewrite rule, so /product/cowboy-cream would 404 on a hard refresh. With
 * hashes the URL is #/product/cowboy-cream and every deep link survives.
 */
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/meet-raema" element={<MeetRaeMa />} />
          <Route path="/order" element={<Order />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

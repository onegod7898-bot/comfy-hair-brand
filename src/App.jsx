import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Categories from './pages/Categories'
import Product from './pages/Product'
import Bag from './pages/Bag'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Onboarding from './pages/Onboarding'
import Auth from './pages/Auth'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Favorites from './pages/Favorites'
import MyOrders from './pages/MyOrders'
import Chat from './pages/Chat'
import ProfilePlaceholder from './pages/ProfilePlaceholder'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Categories />} />
        <Route path="about" element={<About />} />
        <Route path="gallery" element={<Gallery />} />
        <Route path="contact" element={<Contact />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="cart" element={<Bag />} />
        <Route path="bag" element={<Navigate to="/cart" replace />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="order-success" element={<OrderSuccess />} />
        <Route path="profile" element={<Profile />} />
        <Route path="profile/:page" element={<ProfilePlaceholder />} />
        <Route path="settings" element={<Settings />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="chat" element={<Chat />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

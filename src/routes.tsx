// src/routes.tsx
import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import RequireAuth from './routes/RequireAuth'

// default‐exported pages
const HomePage        = React.lazy(() => import('./pages/Home'))
const AboutPage       = React.lazy(() => import('./pages/About'))

// characters overview & detail
const CharactersPage  = React.lazy(() => import('./pages/AboutList'))
const CharacterDetail = React.lazy(() =>
  import('./pages/CharacterDetail/CharacterDetail')
)

// blog
const BlogListPage       = React.lazy(() => import('./pages/BlogList'))
const BlogCategoriesPage = React.lazy(() => import('./pages/Categories'))
// now pulling the default export of pages/CategoryPage/index.ts
const CategoryPage       = React.lazy(() => import('./pages/CategoryPage/CategoryPage'))
const BlogPostPage       = React.lazy(() => import('./pages/BlogPost'))

// shop
const ShopPage           = React.lazy(() => import('./pages/Shop'))
const CartPage           = React.lazy(() =>
  import('./pages/Cart/CartPage').then(mod => ({ default: mod.CartPage }))
)
const ProductPage        = React.lazy(() =>
  import('./pages/Product/ProductPage').then(mod => ({ default: mod.ProductPage }))
)

// checkout
const CheckoutPage       = React.lazy(() =>
  import('./pages/Checkout/CheckoutPage').then(mod => ({ default: mod.CheckoutPage }))
)
const CheckoutFieldsPage = React.lazy(() =>
  import('./pages/Checkout/CheckoutFieldsPage').then(mod => ({ default: mod.CheckoutFieldsPage }))
)
const CheckoutSuccessPage = React.lazy(() =>
  import('./pages/Checkout/CheckoutSuccessPage').then(mod => ({ default: mod.CheckoutSuccessPage }))
)

// misc pages
const AccountPage        = React.lazy(() => import('./pages/Account'))
const ContactPage        = React.lazy(() => import('./pages/Contact'))
const ForbiddenPage      = React.lazy(() => import('./pages/Errors/Forbidden'))
const ServerErrorPage    = React.lazy(() => import('./pages/Errors/ServerError'))
const NotFoundPage       = React.lazy(() => import('./pages/NotFound/NotFound'))

// private page
const PrivatePage        = React.lazy(() => import('./pages/Private/Private'))

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading…</div>}>
      <Routes>
        {/* public */}
        <Route path="/" element={<HomePage />} />

        {/* about */}
        <Route path="/about" element={<AboutPage />} />

        {/* characters */}
        <Route path="/characters" element={<CharactersPage />} />
        <Route path="/characters/:id" element={<CharacterDetail />} />

        {/* blog */}
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/categories" element={<BlogCategoriesPage />} />
        <Route path="/blog/categories/:category" element={<CategoryPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />

        {/* shop */}
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/product/:slug" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />

        {/* checkout */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/fields" element={<CheckoutFieldsPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccessPage />} />

        {/* misc */}
        <Route path="/account" element={<AccountPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* private */}
        <Route
          path="/private"
          element={
            <RequireAuth>
              <PrivatePage />
            </RequireAuth>
          }
        />

        {/* errors */}
        <Route path="/403" element={<ForbiddenPage />} />
        <Route path="/500" element={<ServerErrorPage />} />

        {/* fallback */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}

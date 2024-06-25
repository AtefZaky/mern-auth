import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Home, Profile, Signin, Signup } from './pages'
import { Header, PrivateRoute } from './components'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route element={<PrivateRoute />} >
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App

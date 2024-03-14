import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Pricing from "./pages/Pricing";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./pages/AppLayout";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import { CitiesProvider } from "./context/citiescontext";
import { AuthProvider } from "./context/fakeAuthContext";
import City from "./components/City";
import Form from "./components/Form";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="product" element={<Product />} />
            <Route path="login" element={<Login />} />
            <Route
              path="app"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="form" element={<Form />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;

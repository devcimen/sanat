import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './globals.css';
import AuthLayout from './_auth/AuthLayout';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import { Home } from './_root/pages';
import RootLayout from './_root/RootLayout';
import { Toaster } from './components/ui/toaster';

const App = () => {
    return (
        <BrowserRouter>
            <main className='flex h-screen'>
                <Routes>
                    {/* public routes */}
                    <Route element={<AuthLayout />}>
                        <Route path='/sign-in' element={<SignInForm />} />
                        <Route path='/sign-up' element={<SignUpForm />} />
                    </Route>

                    {/* private routes */}
                    <Route element={<RootLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                </Routes>
                <Toaster />
            </main>
        </BrowserRouter>
    );
}

export default App;

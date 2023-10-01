import React from 'react';
import Nav from './Nav';
import Footer from './Footer'; // Assume Footer is another component
import { useLocation, useRoutes } from 'react-router-dom';
import useUser from '../Hooks/useUser';

const Layout = ({ children, displayNav }) => {
    const location = useLocation()
    const user = useUser();
    // console.log('Rendering once')
    const navRoutes = ['/', '/contact', '/grammar', '/courses', `/my-progress/${user.userId}`, '/login', "/signup"];
    const excludeNavPage = '/cursodeingles';
    // no need to include nav in login, just make sure progress page has the same background color
    const shouldExcludeNav = location.pathname === excludeNavPage;
    return (
        <div className="flex flex-col  overflow-x-hidden z-8">

            {!shouldExcludeNav && <Nav />}

            <main className='p-0 font-body'>
                {children}
            </main>
            {!shouldExcludeNav && <Footer />}

        </div>
    );
}

export default Layout;

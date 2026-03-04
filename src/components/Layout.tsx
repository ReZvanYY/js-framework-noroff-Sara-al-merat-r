import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f5e6] font-serif text-gray-800">
      
      {/* Header*/}
      <header className="bg-indigo-900 text-[#f8f5e6] border-b-4 border-indigo-700/50 border-dashed shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 opacity-10  pattern-repeat"></div>

        <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-10">
          <Link to="/" className="text-3xl font-black tracking-tight hover:text-orange-200 transition-colors">
           Aurora Shop.
          </Link>
          <ul className="flex space-x-8 font-bold tracking-wide text-lg">
            <li>
              <Link to="/" className="hover:bg-orange-200/20 px-2 py-1 rounded-md transition-all -rotate-1 inline-block hover:rotate-0">
                Home
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:bg-orange-200/20 px-2 py-1 rounded-md transition-all rotate-1 inline-block hover:rotate-0">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:bg-orange-200/20 px-2 py-1 rounded-md transition-all -rotate-1 inline-block hover:rotate-0">
                Cart (0)
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      {/* 3. Main Content Area */}
      <main className="flex-grow container mx-auto px-4 py-12 flex flex-col">
        <div className="flex-grow bg-[#fffdf5] rounded-3xl border-2 border-gray-800 p-8 md:p-12">
          <Outlet /> 
        </div>
      </main>

      {/* 4. Footer: Removed the perfect smooth curve. */}
      <footer className="bg-indigo-950 text-[#f8f5e6] text-center pt-10 pb-8 px-6 border-t-4 border-indigo-800/50 border-dashed relative overflow-hidden">
         <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ0Ij48cGF0aCBkPSJNMSAzTDMgMU0xIDFMMyAzIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMC41IiAvPjwvc3ZnPg==')] pattern-repeat"></div>
        <p className="font-medium tracking-wider italic relative z-10">
          &copy; 2026 Aurora Shop. Handcrafted with care.
        </p>
      </footer>
    </div>
  );
}

export default Layout;
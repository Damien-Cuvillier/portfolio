// src/components/Header.js
import React from 'react';

function Header({interactiveMode, setInteractiveMode }) {
  return (
    <header>
      <nav class="flex justify-center space-x-4">
        <a href="/dashboard" class="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">
        <img src="/images/logo.jpg" alt='Accueil' class="w-8 h-8 object-contain rounded-full"/></a>
        <a href="/team" class="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">A propos</a>
        <a href="/projects" class="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Projets</a>
        <a href="/contacts" class="font-bold px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900">Contacts</a>
</nav>
      <button className="mt-6 px-4 py-2 my-10 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setInteractiveMode(prev => !prev)}>
        {interactiveMode ? 'Mode classique' : 'Mode interactif'}
      </button>
    </header>
  );
}

export default Header;

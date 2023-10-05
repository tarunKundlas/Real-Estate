import React from "react";

function Header() {
  return (
    <header className="bg-slate-200 shadow-md ">
      <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
        <span className="text-slate-500">Tarun</span>
        <span className="text-slate-700">Estate</span>
      </h1>
      <form>
        <input type="text " placeholder="search.." />
      </form>
    </header>
  );
}

export default Header;

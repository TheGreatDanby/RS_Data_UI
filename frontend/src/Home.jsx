import React from "react";
import Menu from "./components/Menu";

function Home() {
  return (
    <div className="h-full min-h-screen min-w-40 bg-gray-200 p-5">
      <h1 className="text-2xl">Home Page</h1>
      <Menu />
    </div>
  );
}

export default Home;

import { useState } from "react";
import { Conversations } from "./conversations";
import { SidebarHeader } from "./header";
import { Search } from "./search";
import { SearchResults } from "./search";

export default function Sidebar({ onlineUsers, typing }) {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="flex0030 max-w-[30%] h-full select-none">
      {/*Sidebar Header*/}
      <SidebarHeader />
      {/*Search*/}
      <div className="mt-2"><Search
        searchLength={searchResults.length}
        setSearchResults={setSearchResults}
      /></div>
      {searchResults.length > 0 ? (
        <>
          {/*Search results*/}
          <SearchResults
            searchResults={searchResults}
            setSearchResults={setSearchResults}
          />
        </>
      ) : (
        <>
          {/*Conversations*/}
          <div className="mt-2"><Conversations onlineUsers={onlineUsers} typing={typing} /></div>
          
        </>
      )}
    </div>
  );
}

import React from 'react'
import './../styles/ViewToggle.css'
// Icons
import { MdOutlineViewCompact } from "react-icons/md";
import { FaList } from "react-icons/fa6";
import { MdGridView } from "react-icons/md";

function ViewToggle({setViewIndex}) {
    const toggleList = () => {
        setViewIndex(0);
        storeViewIndex(0);
    }

    const toggleGrid = () => {
        setViewIndex(1);
        storeViewIndex(1);
    }

    const toggleCompact = () => {
        setViewIndex(2);
        storeViewIndex(2);
    }
    const storeViewIndex = (new_index) => {
        localStorage.setItem('viewIndex', new_index);
    }
  return (
    <div className='view-buttons'>
    <button onClick={toggleList} className='icon' title='List View'>
        <FaList />
    </button>
    <button onClick={toggleGrid} className='icon' title='Grid View'>
        <MdGridView />
    </button>
    <button onClick={toggleCompact} className='icon' title='Compact View'>
        <MdOutlineViewCompact />
    </button>
</div>
  )
}

export default ViewToggle
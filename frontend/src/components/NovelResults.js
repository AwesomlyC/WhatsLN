import React from 'react'
import NovelItem from './NovelItem';
import './../styles/NovelResults.css'
function NovelResults({results, viewIndex}) {
    const views = ['detailed', 'grid', 'compact'];
    
    return (
        <div className="light-novels">
            <ul className={`container ${views[viewIndex]}-view`}>
                {results.map(novel => (
                    <NovelItem novel={novel} viewIndex={viewIndex} />
                ))}
            </ul>
        </div>
    )
}

export default NovelResults
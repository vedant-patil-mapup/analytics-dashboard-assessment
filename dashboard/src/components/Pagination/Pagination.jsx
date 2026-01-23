import React, { useEffect, useRef } from 'react';
import './style.css';

const Pagination = (props) => {
    const {dataList, handleDataList, perPage} = props;
    const pageNumber = useRef(0);
    const start = useRef(null);
    const end = useRef(null);

    useEffect(() => {
        if (dataList.length <= 0) return;
        handlePagination(true);
    }, []);

    if (dataList.length <= 0) return <></>;

    const handlePagination = (isNext) => {
        pageNumber.current += (isNext ? 1 : -1);

        if (pageNumber.current <= 0) pageNumber.current = 0;

        if (pageNumber.current >= Math.floor(dataList.length / perPage)) pageNumber.current = Math.floor(dataList.length / perPage);

        start.current = perPage * (pageNumber.current - 1);
        end.current = Math.min(start.current+perPage, dataList.length);

        handleDataList(start.current, end.current);
    }

  return (
    <div className='pagination-container'>
        <h4>Showing {start.current} to {end.current} of {dataList.length} Results</h4>
        <div>
            <button onClick={() => handlePagination(false)} disabled={pageNumber.current <= 1}>Previous</button>
            <button onClick={() => handlePagination(true)} disabled={pageNumber.current >= Math.floor(dataList.length / perPage)}>Next</button>
        </div>
    </div>
  )
};

export default Pagination
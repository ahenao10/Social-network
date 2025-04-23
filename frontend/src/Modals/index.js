import React from 'react';
import ReactDom from 'react-dom';
// import '.Modals.css';

function Modals({ children }) {

    return ReactDom.createPortal(
        <div className='modals-container'>
            {children}
        </div>, 
        document.getElementById('modals')
    )
}

export default Modals;
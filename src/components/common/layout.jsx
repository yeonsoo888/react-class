import React, { useEffect, useRef, useState } from "react";

function Layout({children,title,cn}) {
    const frame = useRef(null);
    
    useEffect(() => {
        frame.current.classList.add("on")
    }, []);

    return (
        <section className={title} ref={frame}>
            <div className="inner">
                <h1>{title}</h1>
                {children}
            </div>
        </section>
    )
}

export default Layout;

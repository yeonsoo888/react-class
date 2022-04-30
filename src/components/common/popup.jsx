import React , {forwardRef, useEffect, useState} from "react";

const Popup = forwardRef(({children ,popName} , ref) => {
    const [open,setOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return (
        <>
            { open && (
                <aside className='popup'>
                    <div className={`con ${popName}`}>
                        {children}
                    </div>
                </aside>
            )
            }
        </>
    );
});
export default Popup
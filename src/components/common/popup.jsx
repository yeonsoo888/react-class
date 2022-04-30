import React , {forwardRef, useEffect, useState , useImperativeHandle} from "react";
import {motion, AnimatePresence} from "framer-motion";

const Popup = forwardRef(({children ,popName} , ref) => {
    const [open,setOpen] = useState(false);
    useImperativeHandle(ref, () => {
        return {
            open: () => setOpen(true),
            close: () => setOpen(false),
        }
    });

    useEffect(() => {
        let isScroll = null;
        open ? (isScroll = 'hidden') : (isScroll = 'auto');
        document.body.style.overflow = isScroll;
        return () => {
            document.body.style.overflow = isScroll;
        };
    }, [open]);

    return (
        <AnimatePresence>
            { open && (
                <motion.aside 
                    initial={{opacity: 0}} 
                    animate={{opacity: 1}} 
                    className='popup'>
                    <div className={`con ${popName}`}>
                        {children}
                    </div>
                </motion.aside>
                )
            }
        </AnimatePresence>
    );
});
export default Popup
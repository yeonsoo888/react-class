import React from "react";
import Header from '../common/Header';
import Visual from './Visual';
import News from './news';
import Pics from './pics';
import Vids from './vids';

function Main() {
    return (
        <>
            <Header type={'main'} />
            <Visual />
            <News />
            <Pics />
            <Vids />
        </>
    )
    ;
}

export default Main;

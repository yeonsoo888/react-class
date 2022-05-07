import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Layout from "../common/layout";
import Popup from '../common/popup';

function Gallery() {
	const pop = useRef(null);
	const items = useSelector(store => store.galleryReducer.flicker);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	return (
		<>
			<Layout title={"gallery"}>
				<ul>
					{items.map((item, idx) => {
						return (
							<li
								key={idx}
								onClick={() => {
									pop.current.open();
									setIndex(idx);
								}}>
								<img
									src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
								/>
								<h2>{item.title}</h2>
							</li>
						);
					})}
				</ul>
			</Layout>

			
			<Popup popName="gallery" ref={pop}>
				{
					loading && (
						<>
							<div className='pic'>
							<img
								src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`}
							/>
							</div>
							<p>{items[index].title}</p>
						</>
					)
				}
				<span onClick={() => pop.current.close()}>close</span>
			</Popup> 
		</>
	);
}

export default Gallery;

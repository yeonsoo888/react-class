import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import Layout from "../common/layout";
import Popup from '../common/popup';

function Gallery() {
	const pop = useRef(null);
	const [items, setItems] = useState([]);
	const [isPop, setIsPop] = useState(false);
	//목록의 순서값을 담을 state
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);


	const api_key = 'feb5dbb632085ee9e53c197d363d1a85';
	const method = 'flickr.interestingness.getList';
	const per_page = 10;
	const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${per_page}`;

	useEffect(() => {
		axios
			.get(url)
			.then((json) => {
				setItems(json.data.photos.photo);
				setLoading(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

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

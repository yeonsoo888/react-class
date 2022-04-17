import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import Layout from "../common/layout";

function Gallery() {
	const [items, setItems] = useState([]);
	const [isPop, setIsPop] = useState(false);
	//목록의 순서값을 담을 state
	const [index, setIndex] = useState(0);

	const api_key = 'feb5dbb632085ee9e53c197d363d1a85';
	const method = 'flickr.interestingness.getList';
	const per_page = 10;
	const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${api_key}&format=json&nojsoncallback=1&per_page=${per_page}`;

	useEffect(() => {
		axios
			.get(url)
			.then((json) => {
				console.log(json.data.photos.photo);
				setItems(json.data.photos.photo);
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
										setIsPop(!isPop);
										//리스트 클릭시 해당 리스트의 순서값으로 state변경
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

			{isPop ? <Popup /> : null}
		</>
	);

	function Popup() {
		useEffect(() => {
			document.body.style.overflow = 'hidden';
			return () => (document.body.style.overflow = 'auto');
		}, []);

		return (
			<aside className='popup'>
				{/* index state값에 따라 팝업에 출력되는 내용 변경 */}
				<div className='pic'>
					<img
						src={`https://live.staticflickr.com/${items[index].server}/${items[index].id}_${items[index].secret}_b.jpg`}
					/>
				</div>
				<p>{items[index].title}</p>
				<span onClick={() => setIsPop(!isPop)}>close</span>
			</aside>
		);
	}
}

export default Gallery;

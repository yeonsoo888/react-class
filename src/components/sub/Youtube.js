import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import Layout from "../common/layout";
import Popup from '../common/popup';
import { faPoop } from '@fortawesome/free-solid-svg-icons';

function Youtube() {
	const pop = useRef(null);
	const [items, setItems] = useState([]);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	const api_key = 'AIzaSyCCiJkX1nNqYL222H5m-0fCS65LfzyExlQ';
	const play_list = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
	const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&playlistId=${play_list}&maxResults=3&part=snippet`;

	useEffect(() => {
		axios.get(url).then((json) => {
			setItems(json.data.items);
			setLoading(true);
		});
	}, []);

	return (
		<>
			<Layout title={"youtube"}>
				{items.map((item, idx) => {
					let desc = item.snippet.description;
					let desc_len = desc.length;
					let date = item.snippet.publishedAt;

					return (
						<article
							key={idx}
							onClick={() => {
								setIndex(idx);
								pop.current.open()
							}}>
							<div className='inner'>
								<div className='pic'>
									<img src={item.snippet.thumbnails.medium.url} />
								</div>
								<h2>{item.snippet.title}</h2>
								<p>{desc_len > 200 ? desc.substr(0, 200) + '...' : desc}</p>
								<span>{date.split('T')[0]}</span>
							</div>
						</article>
					);
				})}
			</Layout>
			<Popup popName="youtube" ref={pop}>
				{
					loading && (
						<iframe
							src={
								'https://www.youtube.com/embed/' +
								items[index].snippet.resourceId.videoId
							}
							frameBorder='0'>
						</iframe>
					)
				}
				<span onClick={() => {
					pop.current.close()
				}}>close</span>
			</Popup> 
		</>
	);
}

export default Youtube;

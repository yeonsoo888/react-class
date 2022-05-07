import React, { useRef, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setYoutube } from '../../redux/actions';
import axios from 'axios';
import Layout from "../common/layout";
import Popup from '../common/popup';
import { faPoop } from '@fortawesome/free-solid-svg-icons';

function Youtube() {
	const vidData = useSelector(store => store.youtubeReducer.youtube);
	const dispatch = useDispatch();
	const pop = useRef(null);
	const [index, setIndex] = useState(0);
	const [loading, setLoading] = useState(false);

	const fetchYoutube = async () => {
		const key = process.env.REACT_APP_YOUTUBE_API_KEY;
		const id = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${id}&maxResults=3&part=snippet`;
		
		await axios.get(url).then((json)=>{
			dispatch(setYoutube(json.data.items));
			setLoading(true);
		})
	}

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<>
			<Layout title={"youtube"}>
				{vidData.map((item, idx) => {
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
								vidData[index].snippet.resourceId.videoId
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

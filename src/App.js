import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch , useSelector } from 'react-redux';
import { setYoutube } from './redux/actions';
import axios from 'axios';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Youtube from './components/sub/Youtube';
import Gallery from './components/sub/Gallery';
import Department from './components/sub/Department';
import Location from './components/sub/Location';
import Join from './components/sub/Join';
import Community from './components/sub/community';
import Main from './components/main/main';

import './scss/style.scss';

function App() {
	const path = process.env.PUBLIC_URL;
	const dispatch = useDispatch();

	const fetchYoutube = async () => {
		const key = process.env.REACT_APP_YOUTUBE_API_KEY;
		const id = 'PLHtvRFLN5v-UVVpNfWqtgZ6YPs9ZJMWRK';
		const num = 7;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?key=${key}&playlistId=${id}&maxResults=${num}&part=snippet`;
		await axios.get(url).then((json)=>{
			dispatch(setYoutube(json.data.items));
		})
	}

	const fetchMember = async () => {
		const url = `${path}/DB/department.json`;
		await axios.get(url).then((json) => {
			dispatch({type: "SET_MEMBERS", payload: json.data.data});
		})
	}
	
	const fetchflickr = async () => {
		const key1 = "feb5dbb632085ee9e53c197d363d1a85";
		const method = 'flickr.interestingness.getList';
		const per_page = 10;
		const url = `https://www.flickr.com/services/rest/?method=${method}&api_key=${key1}&format=json&nojsoncallback=1&per_page=${per_page}`;

		await axios.get(url).then((json) => {
			console.log(json);
			dispatch({type: "SET_FLICKER", payload: json.data.photos.photo});
		})
	}
	

	useEffect(() => {
		fetchYoutube();
		fetchMember();
		fetchflickr();
	}, []);
	


	return (
		<>
			<Switch>
				<Route exact path='/' component={Main}></Route>
				
				<Route path='/'>
					<Header type={'sub'} />
				</Route>
			</Switch>

			<Route path='/department' component={Department}></Route>
			<Route path='/community' component={Community}></Route>
			<Route path='/youtube' component={Youtube}></Route>
			<Route path='/gallery' component={Gallery}></Route>
			<Route path='/location' component={Location}></Route>
			<Route path='/join' component={Join}></Route>

			<Footer />
		</>
	);
}

export default App;

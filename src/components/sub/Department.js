import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Layout from "../common/layout";
import {useSelector , useDispatch} from 'react-redux';
import {setMembers , upLike} from '../../redux/actions'

function Department() {
	const path = process.env.PUBLIC_URL;
	
	
	/*
	const [members, setMembers] = useState([]);
	const url = `${path}/DB/department.json`;
	useEffect(() => {
		axios
			.get(url)
			.then((json) => {
				setMembers(json.data.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	*/
	const dispatch = useDispatch();
	const members = useSelector((store) => store.memberReducer.members);

	return (
        <Layout title={"department"}>
			<ul>
				{members.map((data, idx) => {
					return (
						<li key={idx}>
							<img src={`${path}/img/${data.pic}`} />
							<h2>{data.name}</h2>
							<p>{data.position}</p>
							<div>
								<span>like {data.like}</span>
								<div>
									<button onClick={() => {
										let copy = [...members];
										copy[idx].like++;
										dispatch({type: "upLike", payload: copy});
									}}>like</button>
								</div>
							</div>
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Department;

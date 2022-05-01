import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Layout from "../common/layout";
import {useSelector} from 'react-redux';

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
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Department;

import React from "react";
import { useSelector } from 'react-redux';
function Pics() {
	const path = process.env.PUBLIC_URL;
	const members = useSelector((store) => store.memberReducer.members);

	return (
		<>
			<ul className="memberList">
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
		</>
	);
}

export default Pics;

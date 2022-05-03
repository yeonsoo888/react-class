import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import Layout from "../common/layout";
import {useSelector , useDispatch} from 'react-redux';
import {setMembers , upLike} from '../../redux/actions'

function Department() {
	const path = process.env.PUBLIC_URL;
	const changeInput1 = useRef(null);
	const changeInput2 = useRef(null);
	const [confirmMode,setConfirmMode] = useState(false);
	
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

	const changeMode = (i) => {
		if(!confirmMode) {
			let changeMembers = [...members];
			changeMembers[i].changeMode = true;
			dispatch({type:"changeMode",payload: changeMembers});
			setConfirmMode(true);
		} else return;
	}
	
	const endChangeMode = (i) => {
		let changeMembers = [...members];
		changeMembers[i].changeMode = false;
		dispatch({type:"changeMode",payload: changeMembers});
		setConfirmMode(false);
	}

	const handleChange = (i) => {
		let value1 = changeInput1.current.value;
		let value2 = changeInput2.current.value;
		console.log(members);
		let newMembers = [...members];
		newMembers[i].name = value1;
		newMembers[i].position = value2;
		newMembers[i].changeMode = false;
		dispatch({type:"changeMode",payload: newMembers});
		setConfirmMode(false);
	}

	return (
        <Layout title={"department"}>
			<ul>
				{members.map((data, idx) => {
					return (
						<li key={idx}>
							{
								data.changeMode 
								?
								(
									<>
										<img src={`${path}/img/${data.pic}`} />
										<br/>
										<input name='name' defaultValue={data.name} ref={changeInput1} />
										<br />
										<input name='position' defaultValue={data.position} ref={changeInput2} />
										<div>
											<span>like {data.like}</span>
											<div>
												<button onClick={() => {
													endChangeMode(idx);
												}}>취소</button>
												<button onClick={() => {
													handleChange(idx);
												}}>완료</button>
											</div>
										</div>
									</>
								)
								:
								(
									<>
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
												<button onClick={() => {
													changeMode(idx);
												}}>수정</button>
											</div>
										</div>
									</>
								)
							}
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Department;

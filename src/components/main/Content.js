import React, {useState,useEffect,useRef} from "react";

function Content() {
	const latest = JSON.parse(localStorage.getItem("posts"));

	return (
		<main>
			Content
			<ul>
				{
					latest.map((item,i) => {
						if(i <= 2) {
							return (
								<li key={i}>
									<h4>{item.title}</h4>
									<p>{item.content}</p>
								</li>
							)
						}
					})
				}
				
			</ul>
		</main>
	)
}

export default Content;

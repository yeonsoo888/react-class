import React, {useState,useEffect,useRef} from "react";

function News() {
	const latest = JSON.parse(localStorage.getItem("posts"));

	return (
		<div className="news">
			<main>
				News
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
		</div>
	)
}

export default News;

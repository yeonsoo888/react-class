import React, { useRef, useEffect, useState } from 'react';
import Layout from "../common/layout";

function Location() {
	const { kakao } = window;
	const path = process.env.PUBLIC_URL;
	const info = [
		{
			title: '송내역',
			latlag: new kakao.maps.LatLng(37.487626, 126.753045),
			imgSrc: path + '/img/marker1.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '강남 포스코',
			latlag: new kakao.maps.LatLng(37.506354, 127.055006),
			imgSrc: path + '/img/marker2.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
		{
			title: '청담역',
			latlag: new kakao.maps.LatLng(37.51912, 127.051937),
			imgSrc: path + '/img/marker3.png',
			imgSize: new kakao.maps.Size(232, 99),
			imgPos: { offset: new kakao.maps.Point(116, 99) },
		},
	];

	//useRef로 가상DOM참조
	const container = useRef(null);

	//렌더링에 관여하는 주요 state관리
	const [map, setMap] = useState(null);
	const [traffic, setTraffic] = useState(false);
	const [index, setIndex] = useState(0);
	const [mapInfo] = useState(info);

	//트래픽활성 함수
	const handleTraffic = () => {
		if (map) {
			traffic
				? map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
				: map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		}
	};

	//index state가 변경될때마다 지도 다시그리고 마커 다시 출력
	useEffect(() => {

		container.current.innerHTML = '';

		const option = {
			center: mapInfo[index].latlag,
			level: 3,
		};
		const mapInstance = new kakao.maps.Map(container.current, option);

		//마커 출력
		new kakao.maps.Marker({
			map: mapInstance,
			position: mapInfo[index].latlag,
			title: mapInfo[index].title,
			image: new kakao.maps.MarkerImage(
				mapInfo[index].imgSrc,
				mapInfo[index].imgSize,
				mapInfo[index].imgPos
			),
		});

		//지도 컨트롤 타입 인스턴스 생성
		const mapTypeControl = new kakao.maps.MapTypeControl();
		mapInstance.addControl(
			mapTypeControl,
			kakao.maps.ControlPosition.BOTTOMRIGHT
		);

		//zoom컨트롤러 인스턴스 생성
		const zoomControl = new kakao.maps.ZoomControl();
		mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.LEFT);

		//지도 위치 가운데 이동 함수
		const mapInit = () => {
			mapInstance.setCenter(mapInfo[index].latlag);
		};

		//브라우저 리사이즈 할때마다 mapInit함수를 계속 호출해서 화면 중앙값으로 갱신
		window.addEventListener('resize', mapInit);
		return() => window.removeEventListener('resize',mapInit);
		setMap(mapInstance);
		
	}, [index]);

	//traffic state가 변경될때마사 실행 트래픽 오버레이 레이어 표시
	useEffect(() => {
		handleTraffic();
	}, [traffic]);

	//state값 변경에 따라 렌더링될 가상DOM
	return (
		<Layout title={"location"}>
			<div id='map' ref={container}></div>

			<button onClick={() => setTraffic(!traffic)}>
				{traffic ? 'traffic ON' : 'traffic OFF'}
			</button>

			<ul>
				{mapInfo.map((data, idx) => {
					return (
						<li key={idx} onClick={() => setIndex(idx)}>
							{data.title}
						</li>
					);
				})}
			</ul>
		</Layout>
	);
}

export default Location;

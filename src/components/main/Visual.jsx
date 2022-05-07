import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function Visual() {
	return (
		<>
			<figure>
			<Swiper
				className='swiper'
				spaceBetween={50}
				slidesPerView={3}
				onSlideChange={() => console.log('slide change')}
				>
				<SwiperSlide>Slide 1</SwiperSlide>
				<SwiperSlide>Slide 2</SwiperSlide>
				<SwiperSlide>Slide 3</SwiperSlide>
				<SwiperSlide>Slide 4</SwiperSlide>
				...
			</Swiper>
			</figure>
		</>
	);
}

export default Visual;

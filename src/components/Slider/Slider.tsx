import React from 'react'
import { Props } from './Slider.types'
import './Slider.scss'

export default function Slider({
	minDistance,
	maxDistance,
	sliderValue,
	setSliderValue,
}: Props) {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSliderValue(event.target.value)
	}

	return (
		<div className="slider-container">
			<div className="slider">
				<span className="distance-label">{minDistance} km</span>
				<input
					type="range"
					min={minDistance}
					max={maxDistance}
					className="slider"
					value={sliderValue}
					onChange={handleChange}
					step="1"
				/>
				<span className="distance-label">{maxDistance} km</span>
			</div>
			<div>{sliderValue} km</div>
		</div>
	)
}

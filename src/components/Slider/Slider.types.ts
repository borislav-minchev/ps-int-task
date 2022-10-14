import { Dispatch, SetStateAction } from 'react'

export type Props = {
	minDistance: string
	maxDistance: string
	sliderValue: string
	setSliderValue: Dispatch<SetStateAction<string>>
}
